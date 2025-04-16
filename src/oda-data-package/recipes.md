# Recipes

Every proper cookbook shows you how to apply what you’ve learned by walking you through real-life scenarios. The
following step-by-step recipes will guide you through common tasks and help you make the most of the `oda-data` package.

## Aid from a provider

Suppose we are interested in getting data from a particular donor entity. More specifically, we want to retrieve ODA
contributions from DAC countries between 2018-2023.

The first thing we need to do is to create an instance of `OECDClient` with these details. Since the period under
consideration is from 2018 onwards, we set measure to `grant_equivalents`. Note that we do not explicitly define
`currency` and `base_year`, for which the output will be in current US dollars by default.

```python
from oda_data.tools.groupings import provider_groupings
from oda_data import set_data_path, ODAData

# set the path to the directory where the data should be stored
set_data_path("path/to/data/folder")

# get donor ids
dac_countries = provider_groupings()["dac_countries"]

# instantiate object specifying key details of the desired output
client = OECDClient(
    years=range(2018, 2024),
    providers=list(dac_countries),
    measure="grant_equivalent",
    use_bulk_download=True
)
```

For this exercise, we will retrieve bilateral, multilateral and total ODA. Since this involves the donor perspective,
the source of this query will be [DAC1](../oda-data/dac1). After checking the available indicators, and selecting the
ones we are interested in, we get the data:

```python
# define indicators
indicators = [
    "DAC1.10.1015", # Bilateral ODA
    "DAC1.10.2000", # Multilateral ODA
    "DAC1.10.1010"  # Total ODA
]

# load indicators and get data
oda_from_dac_countries = client.get_indicators(indicators=indicators)
```

We can now analyze the resulting DataFrame. For instance, let's verify that the sum of bilateral and multilateral
results in total ODA:

```python
# pivot table to create columns for each indicator
pivot_df = oda_from_dac.pivot_table(
    index=["year", "donor_name"],
    columns="aid_type",
    values="value"
).reset_index()

# compute sum of bilateral and multilateral
pivot_df["computed_total"] = (
        pivot_df["Bilateral ODA"] + 
        pivot_df["Multilateral ODA (capital subscriptions are included with grants)"]
)

# compute the mean difference between total and computed total ODA
mean_computed_share = (
    pivot_df["computed_total"] - pivot_df["Official Development Assistance (ODA)"]
).mean()

# the result is not exactly 0 due to floating-point differences
print(mean_computed_share)
# Output: 
# -0.0003225806451042681
```

## Aid from a provider to a recipient

Now we would like to retrieve ODA flows from a provider to a recipient. As a general example, let's get bilateral and
multilateral flows from all bilateral donors to all recipients, i.e. developing countries and regions.

Since this query involves a flow from provider to recipient, the resulting data will come
from [DAC2A](../oda-data/dac2a). As a reminder, only DAC2A includes ODA disbursements, so we must specify a disbursement
measure when calling `OECDClient`.

<div class="warning">
    DAC2A does not distinguish between bilateral and multilateral aid, as both countries and multilateral organisations 
    are listed as providers. To isolate bilateral flows, make sure to include only countries as providers. For 
    multilateral flows, they are not directly available — use Imputed Multilateral ODA as an approximation.
</div>

```python
from oda_data import set_data_path, OECDClient
from oda_data.tools.groupings import provider_groupings, recipient_groupings

# set the path to the directory where the data should be stored
set_data_path("path/to/data/folder")

# get provider and recipient ids
all_bilateral = provider_groupings()["all_bilateral"]
developing_countries = recipient_groupings()["all_developing_countries_regions"]

# instantiate object specifying key details of the desired output
client = OECDClient(
    years=range(2018, 2024),
    providers=list(all_bilateral),
    recipients=list(developing_countries),
    measure="net_disbursement",
    use_bulk_download=True
)

# define indicators
indicators = [
    "DAC2A.10.206",  # ODA disbursments — equivalent to bilateral for country providers
    "DAC2A.10.106"   # Imputed multilateral
]

# load indicators into object and get data
oda_to_dev_countries = client.get_indicators(indicators=indicators)
```
