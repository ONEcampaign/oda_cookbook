# Recipes

Every proper cookbook shows you how to apply what you’ve learned by walking you through real-case scenarios. In this section, we outline some practical use-cases for the `oda-data` package. Whether you’re interested in tracking ODA flows by country, comparing donor contributions, or analyzing trends over time, these step-by-step recipes will guide you through common tasks and help you make the most of the package.

Ready to start cooking with ODA data? Let’s dive in!

## Aid from a donor country/group

Suppose we are interested in getting ODA data for a particular donor entity. Since this involves the donor perspective, the source of this query will be DAC1 (we do not have to set this explicitly though, as the package takes care of it). The script below retrieves total, bilateral and multilateral ODA contributions from DAC member countries between 2018-2022. Since the period under consideration is from 2018 on, we load indicators in grant equivalent units (ge). Note that we do not explicitly define `currency` and `prices` when creating an `ODAData` class instance, for which the output will be in current US dollars.

```python
from oda_data.tools.groupings import donor_groupings
from oda_data import set_data_path, ODAData

# set the path to the directory where the data should be stored
set_data_path("path/to/data/folder")

# get ids of DAC countries
dac_countries = donor_groupings()["dac_countries"]

# instantiate object specifying key details of the desired output
oda = ODAData(
    years=range(2018, 2023),
    donors=list(dac_countries),
    include_names=True,
)

# define indicators
indicators = ["total_oda_ge", "total_oda_bilateral_ge", "total_oda_multilateral_ge"]

# load indicators into object and get data
oda_from_dac = oda.load_indicator(indicators=indicators).add_share_of_total().get_data()
```

We may now perform operations on the resulting DataFrame. For instance, let's verify that adding the shares of bilateral and multilateral ODA result in 100:

```python
# pivot table to create share columns for each indicator
pivot_df = oda_from_dac.pivot_table(
    index=["year", "donor_name"],
    columns="indicator",
    values="share"
).reset_index()

# compute sum of bilateral and multilateral shares
pivot_df["computed_share"] = (
        pivot_df["total_oda_bilateral_ge"] + pivot_df["total_oda_multilateral_ge"]
)

# calculate the mean of the computed share values
mean_computed_share = (pivot_df["computed_share"]).mean()

# the result is not exactly 100 due to floating-point differences
print(mean_computed_share)
# Output: 
# 99.99959929032259
```

Next, let's compute total ODA contributions from DAC members between 2018-2022:

```python
# compute total contributions
dac_total = oda_from_dac.loc[
    (oda_from_dac["indicator"] == "total_oda_ge"), "value"
].sum()

print(f"Total ODA from DAC members in 2018-2022: US$ {dac_total: .2f} million")
# Output:
# Total ODA from DAC members in 2018-2022: US$  864492.67 million
```

As a final exercise, let's retrieve France's bilateral ODA contributions in 2020:

```python
france_bi_2020 = oda_from_dac.loc[
    (oda_from_dac["donor_name"] == "France")
    & (oda_from_dac["year"] == 2020)
    & (oda_from_dac["indicator"] == "total_oda_bilateral_ge"),
    "value",
].iloc[0]

print(f"Bilateral ODA from France in 2020: US$ {france_bi_2020: .2f} million")
# Output:
# Bilateral ODA from France in 2020: US$  9146.07 million
```

## Aid to a recipient country/group

Suppose we are interested in retrieving ODA data to a particular recipient country or region, say Africa. In this case, we want to get the recipient's perspective so the resulting data will come from DAC2A. In this sense, we need to adjust the indicators loaded on `ODAData` class so that they begin with `recipient_`. Note how the recipient group we are selecting is `african_countries_regional`, which includes countries and regions in Africa. This group captures total ODA to Africa, as ODA flows to countries do not overlap with those to regions.

```python
from oda_data.tools.groupings import recipient_groupings
from oda_data import set_data_path, ODAData

# set the path to the directory where the data should be stored
set_data_path("./code_examples/data")

# get ids of african countries and regions
africa_all = recipient_groupings()["african_countries_regional"]

# instantiate object specifying key details of the desired output
oda = ODAData(
    years=range(2018, 2023),
    recipients=list(africa_all),
    include_names=True,
)

# define indicators
indicators = [
    "recipient_total_flow_net", 
    "recipient_bilateral_flow_net", 
    "recipient_imputed_multi_flow_net"
]

# load indicators into object and get data
oda_to_africa = oda.load_indicator(indicators=indicators).add_share_of_gni().get_data()
```

Let's determine what countries received the largest total ODA contributions as a share of GNI:

```python
# compute total ODA share of GNI for each country per year and sort values
gni_share_sorted = (
    oda_to_africa
    [oda_to_africa["indicator"] == "recipient_total_flow_net"]
    .groupby(["recipient_name", "year"])["gni_share"]
    .sum()
    .sort_values(ascending=False)
)

print(gni_share_sorted.head())

# Output:
# recipient_name      year
# Egypt               2021     0.6216
#                     2018    0.51258
# Africa unspecified  2020    0.45988
# Egypt               2020    0.44001
# Sudan               2020    0.42241
# Name: gni_share, dtype: double[pyarrow]
```

Finally, let's compute total ODA to africa each year, as well as the share of bilateral vs multilateral:

```python
# compute indicator totals per year
oda_to_africa_totals = (oda_to_africa
                          .groupby(["year", "indicator"], as_index=False)
                          .agg({"value": "sum"}))

# pivot the data so indicators become columns
pivot = oda_to_africa_totals.pivot(index="year", columns="indicator", values="value").reset_index()

# compute bilateral and multilateral as a share of total ODA
pivot["bilateral_share"] = pivot["recipient_bilateral_flow_net"] / pivot["recipient_total_flow_net"]
pivot["multilateral_share"] = pivot["recipient_imputed_multi_flow_net"] / pivot["recipient_total_flow_net"]

print(pivot)

# Output:
#    year  recipient_bilateral_flow_net  recipient_imputed_multi_flow_net  recipient_total_flow_net     bilateral_share   multilateral_share
# 0  2018                     287848.92                         118971.84                 406820.76  0.7075571069676975   0.2924428930323025
# 1  2019                     298674.07                         114207.86                 412881.93  0.7233885726120298  0.27661142738797023
# 2  2020                     378595.63                         128559.03                 507154.66  0.7465092206783628   0.2534907793216373
# 3  2021                     380918.62                         151975.28                  532893.9  0.7148113723951428  0.28518862760485714
# 4  2022                     353860.27                         112040.62                 465900.89  0.7595183387608467  0.24048166123915324
```

## Aid to a country/group by sector