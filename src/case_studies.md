# Case Studies

This section describes the process of retrieving data for specific cases.

## Aid from a donor country/group

Suppose we are interested in getting ODA data for a particular donor entity. Since this involves the donor perspective, the source of this query will be DAC1 (we do not have to set this explicitly though, as the `oda-data` takes care of it). The script below retrieves total, bilateral and multilateral ODA contributions from DAC member countries between between 2018-2022. Since the period under consideration is from 2018 onwards, we load indicators in grant equivalent units (ge). Note that we do not explicitly define `currency` and `prices` when creating an `ODAData` class instance, for which the output will be in current US dollars.  

```python
from oda_data.tools.groupings import donor_groupings
from oda_data import set_data_path, ODAData

# set the path to the directory where the data should be stored
set_data_path("path/to/data/folder")

# get donor ids
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

We may now perform operations on the resulting DataFrame. For instance, let's verify that total ODA is equal to the sum of bilateral and multilateral ODA.

```python
# pivot table such that each indicator has its own column
pivot_df = oda_from_dac.pivot_table(
    index=["year", "donor_name"], 
    columns="indicator", 
    values="value"
).reset_index()

# compute total ODA as the sum of bilateral and multilateral columns
pivot_df["computed_total_oda_ge"] = (
        pivot_df["total_oda_bilateral_ge"] + pivot_df["total_oda_multilateral_ge"]
)

# compute the mean difference between computed and official total ODA
mean_diff = (pivot_df["computed_total_oda_ge"] - pivot_df["total_oda_ge"]).mean()

# the result is not exactly zero due to floating-point differences
print(mean_diff)
# Output: 
# -0.00025806451608657757
```

Next, we compute the total ODA contributions from DAC members between 2018-2022.

```python
# compute total contributions
dac_total = oda_from_dac.loc[
    (oda_from_dac["indicator"] == "total_oda_ge"), "value"
].sum()

print(f"Total ODA from DAC members in 2018-2020: US$ {dac_total: .2f} million")
# Output:
# Total ODA from DAC members in 2018-2020: US$  864492.67 million
```

As a final exercise, we retrieve France's bilateral ODA contributions in 2020.

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

## Aid to a recipient country/region
