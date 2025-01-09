# oda-data Package

The `oda-data` python package is ONE's primary tool for accessing and working with ODA data. It speeds up analysis by handling the heavy lifting—downloading, cleaning, and loading data directly from the OECD's bulk download service. Once stored locally, generating outputs is incredibly fast.

Beyond standard OECD DAC indicators, the package also offers access to unique datasets and analyses created by ONE, such as gender or climate-related data in gross disbursement terms and imputations for multilateral sectors. As an additional feature, the package  lets you view data in multiple currencies.

`oda-data` lives in a [GitHub repository](https://github.com/ONEcampaign/oda_data_package) and can be installed via pip:

```bash
pip install oda-data --upgrade
```

## Getting started

Begin by importing the package into your python environment:

```python
import oda_data 
```

The `ODAData` class is the heart of the `oda-data` package. It lets you access and work with ODA data with minimal code by specifying key attributes such as years, donors, recipients and more. Any operation done with the `oda-data` packages requires an `ODAData` instance. This is like opening a blank file where you will load your data.

```python
oda = oda_data.ODAData(
   years= [],           # List of years to include in the data. Default is an empty list (all years)
   donors=None,         # List of donor codes. Default is None (all donors)
   recipients=None,     # List of recipient codes. Default is None (all recipients)  
   currency='USD',      # Currency for data (e.g., "USD", "EUR", "GBP", "CAD"). Default is "USD"
   prices="current",    # Pricing mode: "current" (default) or "constant" 
   base_year=None,      # Base year for constant prices. Required if prices is set to "constant"
   include_names=False, # Whether to include names in the data. Default is False
)
```

Now, you can load data by specifying the ODA indicator you are interested in:

```python
oda.load_indicator(
   indicators="total_oda_official_definition" # One or many string indicators in a list
)
```

Not sure what indicators are available? No problem! You can quickly check with: 

```python
oda.available_indicators()
```

After loading the data, you can use it as a pandas DataFrame: 

```python
data = oda.get_data()
```

Note that the resulting ODA values are expressed in million currency units.

## Code Walkthrough

The following script retrieves total ODA according to the official definition (i.e. ODA flows before 2018 and grant equivalents after) in constant 2021 Euros between 2018-2021.

```python
from oda_data import ODAData, set_data_path

# set the path to the folder where the data should be stored
set_data_path("path/to/data/folder")

# create object, specifying key details of the desired output
oda = ODAData(
   years=range(2018, 2022), 
   currency="EUR", 
   prices="constant",
   base_year=2021, 
   include_names=True
)

# load indicator
oda.load_indicator(indicators=["total_oda_official_definition"])

# get the data
data = oda.get_data()

print(data.head())
```

The resulting DataFrame should look like this:

| year | indicator                     | donor_code | donor_name | currency | prices   | value        |
|------|-------------------------------|------------|------------|----------|----------|--------------|
| 2018 | total_oda_official_definition | 1          | Austria    | EUR      | constant | 1054.254302  |
| 2018 | total_oda_official_definition | 2          | Belgium    | EUR      | constant | 2089.360102  |
| 2018 | total_oda_official_definition | 3          | Denmark    | EUR      | constant | 2352.403505  |
| 2018 | total_oda_official_definition | 4          | France     | EUR      | constant | 10863.209771 |
| 2018 | total_oda_official_definition | 5          | Germany    | EUR      | constant | 22682.598838 |
