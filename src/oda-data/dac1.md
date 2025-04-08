# DAC1

The DAC1 presents ODA data as reported by donor countries, with each row containing a contribution aggregated by aid
type.

DAC1 helps answer questions like:

- _How much ODA do DAC countries provide?_
- _What is the share of bilateral and multilateral ODA for country X?_
- _How much ODA does Country X provide to UN agencies?_

In addition to broad aid types such as bilateral and multilateral, DAC1 breaks down contributions into smaller
categories that are useful for more in-depth analysis. The following diagram gives a rough overview of how DAC1 breaks
down contributions:

```
├── Official Development Assistance
    ├── Bilateral ODA
    │   ├── Project-type interventions 
    │   │   ├── Investment projects 
    │   │   └── ...
    │   ├── Experts and other technical assistance 
    │   ├── Scholarships and student costs in donor countries
    │   └── ...
    └── Multilateral ODA (Contributions to:)
        ├── UN Agencies
        ├── EU Institutions
        ├── IDA
        ├── Other World Bank
        └── ...
```

DAC1 also includes data in different flows, i.e., commitments, disbursements, and grant equivalents. Note that the
official flow for contributions after 2017 should be 'Grant equivalents' and 'Disbursements, net' otherwise.

A final breakdown is amount type or currency, which includes dollars in current and constant prices as well
as local currency units.

If you choose to work with DAC1 data directly – as opposed to via the [oda-data package](../oda-data-package) – make
sure your data contains a unique flow and amount type, as well as non-overlapping aid types and donor countries.

This is what the DAC1 looks like:

| DONOR | Donor                 | PART | Part                              | AIDTYPE | Aid type                                                           | FLOWS | Fund flows             | AMOUNTTYPE | Amount type                         | TIME | Year | Value       | Flags |
|-------|-----------------------|------|-----------------------------------|---------|--------------------------------------------------------------------|-------|------------------------|------------|-------------------------------------|------|------|-------------|-------|
| 20011 | DAC EU Members, Total | 1    | 1 : Part I - Developing Countries | 1600    | I.A.6. Debt relief                                                 | 1130  | Disbursements received | A          | Current Prices (USD millions)       | 2012 | 2012 | -418.25     |       |
| 820   | New Zealand           | 1    | 1 : Part I - Developing Countries | 1220    | I.A.2.2. Specific-purpose programmes & funds managed by int'l org. | 1151  | Commitments-Grants     | N          | National currency (millions)        | 2018 | 2018 | 53.805232   |       |
| 613   | Kazakhstan            | 1    | 1 : Part I - Developing Countries | 1010    | I. Official Development Assistance (ODA) (I.A + I.B)               | 1150  | Commitments-Total      | A          | Current Prices (USD millions)       | 2022 | 2022 | 36.863453   |       |
| 9     | Portugal              | 1    | 1 : Part I - Developing Countries | 2103    | I.B.1.3. IDA                                                       | 1140  | Net Disbursements      | D          | Constant Prices (2022 USD millions) | 2009 | 2009 | 1.055612    |       |
| 701   | Japan                 | 1    | 1 : Part I - Developing Countries | 3320    | IV.A. Bilateral Private Flows                                      | 1140  | Net Disbursements      | N          | National currency (millions)        | 2005 | 2005 | 1720898.232 |       |

Uppercase columns (e.g., DONOR, PART, AIDTYPE) contain codes representing various categories, while capitalized
columns (e.g., Donor, Part, Aid type) provide readable labels for those codes.

For more information on the DAC1 database, visit
the [OECD Data Explorer](https://data-explorer.oecd.org/vis?tm=DAC1&pg=0&snb=1&df[ds]=dsDisseminateFinalDMZ&df[id]=DSD_DAC1%40DF_DAC1&df[ag]=OECD.DCD.FSD&df[vs]=1.3&dq=DAC...1140%2B1160..Q.&lom=LASTNPERIODS&lo=10&to[TIME_PERIOD]=false).
