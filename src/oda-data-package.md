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

Begin by importing the package into your python environment:

```python
import oda_data 
```

The `Indicators` class is the heart of the `oda-data` package. It lets you access and work with ODA data with minimal
code by specifying key attributes such as years, providers, recipients and more. Most operations done with the
`oda-data` package require an `Indicators` instance. This is like opening a blank file where you will load your data.

```python
oda = oda_data.ODAData(
    years= [],                    # List of years to include in the data. Default is None (all years)
    providers=None,               # List of donor codes. Default is None (all donors)
    recipients=None,              # List of recipient codes. Default is None (all recipients)  
    measure="net_disbursement"    # String or list with measures. Default is "net_disbursement"
    currency='USD',               # Currency for data (e.g., "USD", "EUR", "GBP", "CAD"). Default is "USD"
    base_year=Nonne,              # Base year for constant prices conversion. Default is None, which returns current prices
    use_bulk_download = False     # Whether to use the bulk download service or the data-explorer API. Default is False
    refresh_data = False          # Whether to download new data instead of using saved filed. Default is False
)
```

Now, you get as a DataFrame data by specifying the ODA indicator(s) you are interested in. For example, to get a
provider's bilateral ODA in grant equivalents, we use the following indicator code:

```python
data = oda.get_indicators(
   indicators="DAC1.10.11015"
)
```

Not sure what indicators are available? No problem! You can quickly check with:

```python
oda.available_indicators()
```

You may also export a detailed CSV with indicator codes, names and descriptions:

```python
oda.export_available_indicators(export_folder="path/to/folder/")
```

You can learn more about the package's nomenclature for indicators [here](./oda-data-package/indicators).

## Code Walkthrough

The following script retrieves total ODA in grant equivalents and constant 2023 Euros between 2018-2023.

```python
from oda_data import ODAData, set_data_path

# set the path to the folder where the data should be stored
set_data_path("path/to/data/folder")

# create object, specifying key details of the desired output
oda = Indicators(
    years=range(2018, 2024),
    measure="grant_equivalent",
    currency="EUR",
    base_year=2023,
)

# load indicator
data = oda.get_indicators(indicators="DAC1.10.11010")

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

Note that values are always expressed in million currency units, as indicated by the `unit_multiplier` column, i.e. all
values should be multiplied by 10<sup>6</sup>.