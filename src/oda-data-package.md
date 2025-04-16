# oda-data Package

The `oda-data` python package is ONE's primary tool for accessing and working with ODA data. It speeds up analysis by
handling the heavy lifting—downloading, cleaning, and loading data directly from the OECD's bulk download service. Once
stored locally, getting the data is really fast.

Beyond standard OECD DAC indicators, the package also offers access to unique datasets and analyses created by ONE, such
as gender or climate-related data in gross disbursement terms and imputations for multilateral sectors. As an additional
feature, the package handles currency conversion.

`oda-data` lives in a [GitHub repository](https://github.com/ONEcampaign/oda_data_package) and can be installed via pip:

```bash
pip install oda-data --upgrade
```

## Getting started

Most operations done with the `oda-data` package require creating an instance of the `OECDClient` class. This is like
opening a blank file where you will load your data.

Start by importing the dataset into your Python environment, then define the key attributes you're interested in—such as
years, providers, recipients, and more:

```python
form oda_data import OECDClient

client = OECDClient(
    years=[],                    # List of years to include in the data. Default is None (all years)
    providers=None,               # List of donor codes. Default is None (all donors)
    recipients=None,              # List of recipient codes. Default is None (all recipients)  
    measure="net_disbursement"    # String or list with measures. Default is "net_disbursement"
    currency='USD',               # Currency for data (e.g., "USD", "EUR", "GBP", "CAD"). Default is "USD"
    base_year=Nonne,              # Base year for constant prices conversion. Default is None, which returns current prices
    use_bulk_download=False     # Whether to use the bulk download service or the data-explorer API. Default is False
    refresh_data=False          # Whether to download new data instead of using saved filed. Default is False
)
```

Now you can retrieve the data as a DataFrame by specifying the ODA indicator(s) relevant to your analysis. For instance,
to access a provider’s bilateral ODA reported in grant equivalents, you can use the following indicator code:

```python
data = client.get_indicators(
   indicators="DAC1.10.11015"
)
```

Not sure what indicators are available? No problem! You can quickly check with:

```python
client.available_indicators()
```

You may also export a detailed CSV with indicator codes, names and descriptions:

```python
client.export_available_indicators(export_folder="path/to/folder/")
```

You can learn more about the package's nomenclature for indicators [here](./oda-data-package/indicators).

## Code Walkthrough

The following script retrieves total ODA in grant equivalents and constant 2023 Euros between 2018-2023.

<div class="warning">
    This retrieves ODA flows from all aid providers, i.e. countries, multilateral organisations and private donors. 
    This is likely to result in double-counting, as some of the funding from multilateral organisations comes from 
    countries and private donors. As a general rule, <b>avoid mixing provider types</b> (bilateral, multilateral, private). 
</div>

```python
from oda_data import OECDClient, set_data_path

# set the path to the folder where the data should be stored
set_data_path("path/to/data/folder")

# create object, specifying key details of the desired output
client = OECDClient(
    years=range(2018, 2024),
    measure="grant_equivalent",
    currency="EUR",
    base_year=2023,
    use_bulk_download=True
)

# load indicator
data = client.get_indicators(indicators="DAC1.10.11010")

print(data.head())
```

The resulting DataFrame should look like this:

| donor_code | donor_name | aidtype_code | aid_type                                                | flows_code | fund_flows        | sector_code | sector_name    | year | value        | unit_multiplier | currency | prices   | one_indicator |
|------------|------------|--------------|---------------------------------------------------------|------------|-------------------|-------------|----------------|------|--------------|-----------------|----------|----------|---------------|
| 1          | Austria    | 11010        | Official Development Assistance (ODA), grant equivalent | 1160       | Grant equivalents | <NA>        | Not applicable | 2023 | 1807.10544   | 6               | EUR      | constant | DAC1.10.11010 |
| 2          | Belgium    | 11010        | Official Development Assistance (ODA), grant equivalent | 1160       | Grant equivalents | <NA>        | Not applicable | 2023 | 2613.059392  | 6               | EUR      | constant | DAC1.10.11010 |
| 3          | Denmark    | 11010        | Official Development Assistance (ODA), grant equivalent | 1160       | Grant equivalents | <NA>        | Not applicable | 2023 | 2850.78848   | 6               | EUR      | constant | DAC1.10.11010 |
| 4          | France     | 11010        | Official Development Assistance (ODA), grant equivalent | 1160       | Grant equivalents | <NA>        | Not applicable | 2023 | 14266.371712 | 6               | EUR      | constant | DAC1.10.11010 |
| 5          | Germany    | 11010        | Official Development Assistance (ODA), grant equivalent | 1160       | Grant equivalents | <NA>        | Not applicable | 2023 | 33923.828032 | 6               | EUR      | constant | DAC1.10.11010 |

<div class="warning">
    Note that values are always expressed in million currency units, as indicated by the `unit_multiplier` column, i.e. 
    all values should be multiplied by 10<sup>6</sup>.
</div>