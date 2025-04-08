# DAC2A

The DAC2A table includes ODA disbursements from donor to recipient as reported by both parties. It offers the most
comprehensive view of ODA flows and is ONE's go-to source for most ODA analysis.

DAC2A helps answer questions like:

- _How much ODA do DAC countries provide to developing countries?_
- _What is the share of bilateral vs imputed multilateral aid received by country X from country Y?_
- _How much ODA does country X receive as loans from country Y?_

This is how DAC2A breaks down ODA flows by aid type: 

```
├── Official Development Assistance, disbursements
│    ├── ODA Grants
│    │   ├── Debt forgiveness
│    │   └── ...
│    ├── ODA Loan, net disbursements
│    │   ├── Gross ODA Loans
│    │   │   ├── ODA Loans, rescheduled debt
│    │   │   └── ODA Loans, equity investment
│    │   └── ...
│    └── ...
├── Gross ODA
├── Technical cooperation, disbursements
├── Develoment food aid
├── Humanitarian aid
├── Imputed multilateral
└── ...
```

DAC2A only contains ODA values in US Dollars, but provides them in both constant and current prices

<div class="warning">
DAC2A aggregates donor and recipients countries into different groups, so be mindful of double counting when
working with aggregated data from this table.
</div>

This is what the DAC2A looks like:

| RECIPIENT | Recipient        | DONOR | Donor               | PART | Part                                  | AIDTYPE | Aid type                 | DATATYPE | Amount type                         | TIME | Year | Value  | Flags |
|-----------|------------------|-------|---------------------|------|---------------------------------------|---------|--------------------------|----------|-------------------------------------|------|------|--------|-------|
| 635       | Myanmar          | 68    | Czechia             | 1    | 1 : Part I - Developing Countries     | 286     | ODA as % GNI (Recipient) | A        | Current Prices (USD millions)       | 2012 | 2012 | 0.0    |       |
| 85        | Ukraine          | 960   | UNTA                | 2    | 2 : Part II - Countries in Transition | 206     | ODA: Total Net           | A        | Current Prices (USD millions)       | 1996 | 1996 | 0.66   |       |
| 89        | Europe, regional | 302   | United States       | 1    | 1 : Part I - Developing Countries     | 219     | Recoveries               | D        | Constant Prices (2022 USD millions) | 2015 | 2015 | -0.07  |       |
| 139       | Tunisia          | 4     | France              | 1    | 1 : Part I - Developing Countries     | 206     | ODA: Total Net           | D        | Constant Prices (2022 USD millions) | 1979 | 1979 | 130.02 |       |
| 218       | South Africa     | 20003 | G7 Countries, Total | 1    | 1 : Part I - Developing Countries     | 201     | Grants, Total            | A        | Current Prices (USD millions)       | 1993 | 1993 | 102.83 |       |

Uppercase columns (e.g., RECIPIENT, DONOR, PART) contain codes representing various categories, while capitalized
columns (e.g., Recipient, Donor, Part) provide readable labels for those codes.

For more information on the DAC2A database, visit
the [OECD Data Explorer](https://data-explorer.oecd.org/vis?tm=DAC2A&pg=0&snb=1&df[ds]=dsDisseminateFinalDMZ&df[id]=DSD_DAC2%40DF_DAC2A&df[ag]=OECD.DCD.FSD&df[vs]=1.1&dq=.DPGC.206.USD.Q&lom=LASTNPERIODS&lo=5&to[TIME_PERIOD]=false).