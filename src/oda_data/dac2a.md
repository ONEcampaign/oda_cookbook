# DAC2A
The DAC2A table is ONE's go-to source for ODA data because it offers the most complete view. Each row represents a contribution from a donor to a recipient, with data reported by both sides. Since it tracks aid from donor to recipient, DAC2A is useful for getting total or detailed contributions for specific recipients or groups.

Donor flows are shown at different levels: individual, semi-aggregated, and fully aggregated. Recipients are also categorized as individual countries, sub-regions, or entire regions.

**Be cautious of double-counting** when working with aggregated data, as DAC2A includes multiple levels of detail for both donors and recipients.

This is what the DAC2A looks like:

| RECIPIENT | Recipient        | DONOR | Donor               | PART | Part                                  | AIDTYPE | Aid type                   | DATATYPE | Amount type                         | TIME  | Year | Value  | Flags |
|-----------|------------------|-------|---------------------|------|---------------------------------------|---------|----------------------------|----------|-------------------------------------|-------|------|--------|-------|
| 635       | Myanmar          | 68    | Czechia             | 1    | 1 : Part I - Developing Countries     | 286     | ODA as % GNI (Recipient)   | A        | Current Prices (USD millions)       | 2012  | 2012 | 0.0    |       |
| 85        | Ukraine          | 960   | UNTA                | 2    | 2 : Part II - Countries in Transition | 206     | ODA: Total Net             | A        | Current Prices (USD millions)       | 1996  | 1996 | 0.66   |       |
| 89        | Europe, regional | 302   | United States       | 1    | 1 : Part I - Developing Countries     | 219     | Recoveries                 | D        | Constant Prices (2022 USD millions) | 2015  | 2015 | -0.07  |       |
| 139       | Tunisia          | 4     | France              | 1    | 1 : Part I - Developing Countries     | 206     | ODA: Total Net             | D        | Constant Prices (2022 USD millions) | 1979  | 1979 | 130.02 |       |
| 218       | South Africa     | 20003 | G7 Countries, Total | 1    | 1 : Part I - Developing Countries     | 201     | Grants, Total              | A        | Current Prices (USD millions)       | 1993  | 1993 | 102.83 |       |

The columns in uppercase (e.g., RECIPIENT, DONOR, PART) contain codes representing various categories, while the capitalized columns (e.g., Recipient, Donor, Part) provide readable labels for those codes.

For more information, visit the [OECD Data Explorer](https://data-explorer.oecd.org/vis?tm=DAC2A&pg=0&snb=1&df[ds]=dsDisseminateFinalDMZ&df[id]=DSD_DAC2%40DF_DAC2A&df[ag]=OECD.DCD.FSD&df[vs]=1.1&dq=.DPGC.206.USD.Q&lom=LASTNPERIODS&lo=5&to[TIME_PERIOD]=false).