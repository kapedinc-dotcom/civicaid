//#region node_modules/.nitro/vite/services/ssr/assets/sheet-catalog-CCDj7Uml.js
var DRIVE_CATALOG = {
	fileId: "10VX-IF9mPPkYdntP8VsTwl0FkFQbzIFozHAdBut4XbU",
	name: "CivicAid Benefits",
	webViewLink: "https://docs.google.com/spreadsheets/d/10VX-IF9mPPkYdntP8VsTwl0FkFQbzIFozHAdBut4XbU/edit"
};
/** How often the app checks Drive for a newer sheet. */
var CATALOG_POLL_MS = 8e3;
var directory_default = {
	asOf: "September 2026",
	programs: [
		{
			"name": "SNAP (Supplemental Nutrition Assistance Program) / CalFresh in CA",
			"directoryCategory": "Food",
			"agency": "USDA Food and Nutrition Service; state human-services agencies",
			"programType": "Federal (state-administered)",
			"description": "Largest U.S. food-assistance program. Monthly grocery benefits loaded onto an EBT card accepted at 250,000+ retailers. Not cash. In California the program is called CalFresh.",
			"receive": "Monthly EBT food benefit. FY2026 max for a family of 4 in the 48 states is about $973; average is roughly $188–$194 per person. Minimum benefit for 1–2 person households is $24 (FY2026).",
			"eligibility": "Generally gross income ≤130% of federal poverty level (FPL) and net income ≤100% FPL. Asset limits for FY2026: $3,000 ($4,500 if elderly/disabled member). Households already on SSI or TANF often categorically eligible. Citizenship/immigration rules apply. Work requirements may apply to some adults.",
			"incomeGuideline": "Gross ≤130% FPL (example: family of 3 ~$2,888/mo in FY2026). State variations and deductions (rent, utilities, child care, medical) matter.",
			"available": "All 50 states, DC, Guam, Virgin Islands. Puerto Rico, American Samoa, CNMI use Nutrition Assistance Program block grants instead.",
			"howToApply": "Apply through your state SNAP agency (online portal, phone, or in person). California: BenefitsCal.com. Expedited SNAP (7 days) if very low income/resources.",
			"website": "https://www.fns.usda.gov/snap",
			"applyUrl": "https://www.fns.usda.gov/snap/state-directory",
			"phone": "USDA SNAP info: 1-800-221-5689. National Hunger Hotline: 1-866-3-HUNGRY. CA: 1-877-847-3663",
			"timeline": "Federal standard: 30 days. Expedited: 7 days if eligible. Benefits typically load monthly after approval.",
			"cost": "Free to apply. No legitimate SNAP application fee.",
			"documents": [
				"Photo ID",
				"SSNs",
				"proof of income",
				"rent/utility bills",
				"immigration documents if applicable"
			],
			"notes": "Cannot buy alcohol, tobacco, hot prepared foods (most states), vitamins, or non-food items. Some states have added food-restriction waivers. Recertify periodically. Report changes in income/household.",
			"logoUrl": "https://www.fns.usda.gov/themes/custom/fns_cms/logo.svg",
			"faviconUrl": "https://www.fns.usda.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "calfresh"
		},
		{
			"name": "WIC (Special Supplemental Nutrition Program for Women, Infants, and Children)",
			"directoryCategory": "Food",
			"agency": "USDA FNS; state and local WIC agencies",
			"programType": "Federal (state-administered)",
			"description": "Nutrition program for pregnant/postpartum/breastfeeding women and children under 5. Provides specific healthy foods, nutrition education, breastfeeding support, and referrals—not a general grocery card.",
			"receive": "Monthly food package (formula, fruits/veg, dairy, grains, eggs, etc.) via EBT or checks; nutrition counseling; breastfeeding support. Average food cost historically ~$60/person/month.",
			"eligibility": "Categorical: pregnant, postpartum (up to 6 months), breastfeeding (up to 1 year), infant, or child under 5. Income ≤185% FPL OR adjunctively eligible via SNAP, Medicaid, or TANF. Must be at nutritional risk (determined at WIC appointment). No citizenship requirement.",
			"incomeGuideline": "≤185% FPL (higher than SNAP). Automatically income-eligible if on SNAP/Medicaid/TANF.",
			"available": "Nationwide including territories.",
			"howToApply": "Contact local WIC clinic (phone or online locator). Appointment required for certification. Fathers, grandparents, and foster parents can apply for children in their care.",
			"website": "https://www.fns.usda.gov/wic",
			"applyUrl": "https://www.fns.usda.gov/wic/apply",
			"phone": "1-800-311-BABY (1-800-311-2229) or local WIC clinic",
			"timeline": "Often 1–3 weeks for first appointment depending on clinic capacity. Benefits issued after certification visit.",
			"cost": "Free.",
			"documents": [
				"ID",
				"proof of residence",
				"proof of income or current SNAP/Medicaid/TANF",
				"child's birth info"
			],
			"notes": "Food list is restricted to WIC-approved items. Recertify about every 6–12 months. Presence of a child under 5 is required for child benefits.",
			"logoUrl": "https://www.fns.usda.gov/themes/custom/fns_cms/logo.svg",
			"faviconUrl": "https://www.fns.usda.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "wic"
		},
		{
			"name": "National School Lunch & School Breakfast Programs",
			"directoryCategory": "Food",
			"agency": "USDA FNS; local school districts",
			"programType": "Federal (local schools)",
			"description": "Free or reduced-price meals for children at participating schools. Many districts now offer universal free meals under state laws or Community Eligibility Provision.",
			"receive": "Free or reduced-price breakfast and lunch on school days. Some districts also offer afterschool snacks or supper.",
			"eligibility": "Free meals: household income ≤130% FPL or categorical eligibility (SNAP, TANF, FDPIR, foster, homeless, migrant). Reduced-price: 130–185% FPL. Some states (including CA) provide universal free school meals regardless of income.",
			"incomeGuideline": "Free ≤130% FPL; reduced ≤185% FPL. State universal-meal laws may override.",
			"available": "Participating public and nonprofit private schools nationwide.",
			"howToApply": "Submit the school meal application through your child's school or district portal at the start of the year (or any time income changes). Categorically eligible households may be directly certified and need not apply.",
			"website": "https://www.fns.usda.gov/nslp",
			"applyUrl": "https://www.fns.usda.gov/cn/apply-school-meals",
			"phone": "School nutrition office; USDA: 1-800-221-5689",
			"timeline": "Usually processed within days to 2 weeks of school year start. Benefits begin once approved; some districts serve all students pending processing.",
			"cost": "Free to apply. Reduced-price meals have a small copay unless the district waives it.",
			"documents": ["School meal application", "income or case-number if not directly certified"],
			"notes": "Summer meals: SUN Meals / Summer Food Service Program at community sites when school is out. Check USDA site finder.",
			"logoUrl": "https://www.fns.usda.gov/themes/custom/fns_cms/logo.svg",
			"faviconUrl": "https://www.fns.usda.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "school-meals"
		},
		{
			"name": "Feeding America network / TEFAP food pantries",
			"directoryCategory": "Food",
			"agency": "Feeding America food banks + USDA The Emergency Food Assistance Program (TEFAP)",
			"programType": "Nonprofit + Federal commodities",
			"description": "Nationwide network of food banks and pantries distributing USDA commodities and donated food. Walk-in or appointment depending on site. No EBT card—actual groceries.",
			"receive": "Boxes or bags of groceries; some sites offer hot meals, produce, diapers, or hygiene items. Frequency varies (weekly to monthly).",
			"eligibility": "Set by each pantry. Many use self-declared need or a simple income screen around 185–200% FPL. TEFAP sites have income guidelines. Generally no citizenship test at community pantries.",
			"incomeGuideline": "Varies by pantry; typically low-income or food-insecure households.",
			"available": "200+ food banks and 60,000+ pantries/meal programs across the U.S.",
			"howToApply": "Use Feeding America Find Your Local Food Bank, call 211, or USDA National Hunger Hotline. Walk in with ID and proof of address if requested.",
			"website": "https://www.feedingamerica.org",
			"applyUrl": "https://www.feedingamerica.org/find-your-local-foodbank",
			"phone": "Hunger Hotline 1-866-348-6479 (EN) / 1-877-842-6273 (ES). Text FOOD to 97779.",
			"timeline": "Same day at most pantries. Some require registration first visit.",
			"cost": "Free. Never pay for pantry food.",
			"documents": ["Often photo ID and proof of address", "some sites ask for household size only"],
			"notes": "Best first stop in a food crisis while SNAP is pending. Hours and item limits vary. Bring reusable bags and ID.",
			"logoUrl": "https://www.feedingamerica.org/themes/custom/ts_foodbank/favicon.ico",
			"faviconUrl": "https://www.feedingamerica.org/favicon.ico",
			"asOf": "September 2026",
			"id": "food-bank"
		},
		{
			"name": "Commodity Supplemental Food Program (CSFP)",
			"directoryCategory": "Food",
			"agency": "USDA FNS; state agencies and local distributors",
			"programType": "Federal (state-administered)",
			"description": "Monthly food package for low-income adults age 60+ (some states previously served women/children; now primarily seniors).",
			"receive": "Monthly box of USDA foods (canned fruits/veg, protein, grains, dairy).",
			"eligibility": "Age 60+ and income ≤130% FPL (states may set up to 185% in some cases). Residency in a participating project area.",
			"incomeGuideline": "Generally ≤130% FPL for seniors.",
			"available": "Most states; not every county. Check state CSFP agency.",
			"howToApply": "Apply at local CSFP distribution site (often a food bank or senior center).",
			"website": "https://www.fns.usda.gov/csfp",
			"applyUrl": "https://www.fns.usda.gov/csfp/csfp-contacts",
			"phone": "State CSFP office via FNS contacts page",
			"timeline": "Days to a few weeks; then monthly pickup.",
			"cost": "Free.",
			"documents": [
				"ID",
				"proof of age",
				"proof of income and residence"
			],
			"notes": "Can usually receive CSFP and SNAP together, subject to state rules. Waiting lists exist in some areas.",
			"logoUrl": "https://www.fns.usda.gov/favicon.ico",
			"faviconUrl": "https://www.fns.usda.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "csfp"
		},
		{
			"name": "Meals on Wheels",
			"directoryCategory": "Food",
			"agency": "Meals on Wheels America + local senior nutrition programs (often Older Americans Act funded)",
			"programType": "Nonprofit + Federal/state aging funds",
			"description": "Home-delivered meals and wellness checks for homebound older adults. Congregate (in-person) senior meals also available at many sites.",
			"receive": "Typically 1 meal/day delivered; some programs offer frozen multi-packs, weekend meals, or medically tailored meals.",
			"eligibility": "Generally age 60+ (or spouse of eligible senior). Priority to those who are homebound, frail, low-income, or socially isolated. No strict national income cap for Older Americans Act meals, but donations suggested.",
			"incomeGuideline": "No hard federal income cap; local programs prioritize greatest social/economic need.",
			"available": "Thousands of local programs nationwide.",
			"howToApply": "Use Meals on Wheels locator or call local Area Agency on Aging / 211.",
			"website": "https://www.mealsonwheelsamerica.org",
			"applyUrl": "https://www.mealsonwheelsamerica.org/find-meals",
			"phone": "1-888-998-6325",
			"timeline": "Assessment often within days to 2 weeks. Delivery starts after intake.",
			"cost": "Usually free or suggested donation. Never denied for inability to pay under OAA rules.",
			"documents": [
				"ID",
				"address",
				"and a brief needs assessment",
				"medical notes helpful if diet-restricted"
			],
			"notes": "Also a safety-check program. Ask about pet-food add-ons and weekend coverage.",
			"logoUrl": "https://www.mealsonwheelsamerica.org/favicon.ico",
			"faviconUrl": "https://www.mealsonwheelsamerica.org/favicon.ico",
			"asOf": "September 2026",
			"id": "meals-on-wheels"
		},
		{
			"name": "Food Distribution Program on Indian Reservations (FDPIR)",
			"directoryCategory": "Food",
			"agency": "USDA FNS + Tribal governments",
			"programType": "Federal (Tribal-administered)",
			"description": "USDA food package alternative to SNAP for eligible households living on or near reservations and in approved service areas in Oklahoma.",
			"receive": "Monthly commodity food package. Households generally cannot receive SNAP and FDPIR in the same month.",
			"eligibility": "Low-income American Indian / Alaska Native households living on a reservation or in a designated service area. Income/resource tests similar in spirit to SNAP, set with Tribal flexibility.",
			"incomeGuideline": "Low-income per FDPIR guidelines (aligned with SNAP-type limits).",
			"available": "Participating reservations and FDPIR service areas.",
			"howToApply": "Apply at the local Tribal FDPIR office / ITO (Indian Tribal Organization).",
			"website": "https://www.fns.usda.gov/fdpir",
			"applyUrl": "https://www.fns.usda.gov/fdpir/fdpir-contacts",
			"phone": "Local Tribal FDPIR office",
			"timeline": "Similar to SNAP—often within 30 days; emergency issuance possible.",
			"cost": "Free.",
			"documents": [
				"Tribal enrollment/residency",
				"income",
				"household composition"
			],
			"notes": "Choose SNAP or FDPIR in a given month, not both.",
			"logoUrl": "https://www.fns.usda.gov/favicon.ico",
			"faviconUrl": "https://www.fns.usda.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "fdpir"
		},
		{
			"name": "TANF / CalWORKs (Temporary Assistance for Needy Families)",
			"directoryCategory": "Cash / Income",
			"agency": "HHS Administration for Children and Families; state welfare agencies",
			"programType": "Federal block grant (state-run)",
			"description": "Time-limited cash aid plus work supports for low-income families with children. Each state names and designs its own program (CalWORKs in California). Not an entitlement in the same way SNAP is—states set rules and time limits.",
			"receive": "Monthly cash (amount varies widely by state and family size—often a few hundred dollars). May include child-care help, job training, and one-time diversion payments for a car repair or deposit.",
			"eligibility": "Must have a minor child (or be pregnant) in most states, be a resident, meet very low income and asset tests, and comply with work/participation rules. Lifetime time limits (federal 60 months; some states shorter). Immigration rules apply.",
			"incomeGuideline": "Very low; often well below FPL. State-specific. Family of four commonly must be under ~$45k–$50k in some states, much lower in others.",
			"available": "All states and many Tribes; rules differ dramatically.",
			"howToApply": "Apply at county/state welfare office or state benefits portal (BenefitsCal in CA).",
			"website": "https://www.acf.hhs.gov/ofa/programs/tanf",
			"applyUrl": "https://www.usa.gov/welfare-benefits",
			"phone": "State/county welfare office. USAGov directory via usa.gov",
			"timeline": "Often 30–45 days. Immediate-need / diversion payments can be faster (days to 2 weeks) in some counties.",
			"cost": "Free.",
			"documents": [
				"IDs",
				"SSNs",
				"birth certificates for children",
				"proof of income/resources",
				"rent",
				"pregnancy verification if applicable"
			],
			"notes": "Work requirements and child-support cooperation usually required. One-time diversion can sometimes help with a car or rent instead of opening a monthly case.",
			"logoUrl": "https://www.acf.hhs.gov/favicon.ico",
			"faviconUrl": "https://www.acf.hhs.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "calworks"
		},
		{
			"name": "Supplemental Security Income (SSI)",
			"directoryCategory": "Cash / Income",
			"agency": "Social Security Administration",
			"programType": "Federal",
			"description": "Monthly cash for people who are 65+, blind, or disabled and who have very limited income and resources. Separate from Social Security Disability Insurance (SSDI), which is based on work credits.",
			"receive": "2026 federal max about $967/month individual and $1,450/month eligible couple (after COLA). Many states add a small state supplement. May confer Medicaid eligibility.",
			"eligibility": "Age 65+, blind, or disabled under SSA rules AND countable income/resources below strict limits (generally $2,000 individual / $3,000 couple in resources, excluding a home and one vehicle). Must be a U.S. citizen or qualifying immigrant in most cases.",
			"incomeGuideline": "Very low countable income after SSA exclusions. Earned-income exclusions exist.",
			"available": "Nationwide.",
			"howToApply": "Apply online at ssa.gov, by phone, or at a local Social Security office.",
			"website": "https://www.ssa.gov/ssi",
			"applyUrl": "https://www.ssa.gov/apply",
			"phone": "1-800-772-1213 (TTY 1-800-325-0778)",
			"timeline": "Age 65+ claims can take weeks to a few months. Disability claims often 3–6+ months; appeals take longer.",
			"cost": "Free. Never pay anyone to file an SSI claim.",
			"documents": [
				"SSN",
				"birth certificate",
				"proof of income/resources",
				"medical records for disability claims",
				"immigration papers if applicable"
			],
			"notes": "Back pay possible. Living arrangement (own household vs. someone else's) affects the check. Report wages and changes immediately.",
			"logoUrl": "https://www.ssa.gov/favicon.ico",
			"faviconUrl": "https://www.ssa.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "ssi"
		},
		{
			"name": "Social Security Disability Insurance (SSDI)",
			"directoryCategory": "Cash / Income",
			"agency": "Social Security Administration",
			"programType": "Federal (earned benefit, not charity)",
			"description": "Monthly cash for workers who paid Social Security taxes long enough and who meet SSA's disability standard. Not need-based, but listed because it is a major income source for people who cannot work.",
			"receive": "Based on lifetime earnings. Amounts vary. After 24 months on SSDI, Medicare usually begins.",
			"eligibility": "Medically disabled (or blind) under SSA rules and enough work credits. Not an income-tested welfare program.",
			"incomeGuideline": "Must not engage in Substantial Gainful Activity (SGA). 2026 SGA amounts are set annually by SSA.",
			"available": "Nationwide.",
			"howToApply": "Apply at ssa.gov/apply or local office.",
			"website": "https://www.ssa.gov/disability",
			"applyUrl": "https://www.ssa.gov/apply",
			"phone": "1-800-772-1213",
			"timeline": "Initial decisions commonly 3–8 months; hearings much longer if denied.",
			"cost": "Free to apply. Representatives may charge a regulated fee only if you win.",
			"documents": [
				"Work history",
				"medical records",
				"W-2s",
				"doctors' names"
			],
			"notes": "Different from SSI. You can receive both if the SSDI amount is low (concurrent benefits).",
			"logoUrl": "https://www.ssa.gov/favicon.ico",
			"faviconUrl": "https://www.ssa.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "ssdi"
		},
		{
			"name": "Earned Income Tax Credit (EITC)",
			"directoryCategory": "Tax credits",
			"agency": "Internal Revenue Service",
			"programType": "Federal tax credit",
			"description": "Refundable tax credit for low- to moderate-income workers. You get the money even if you owe $0 in federal income tax. One of the largest anti-poverty cash transfers in the U.S.",
			"receive": "Tax year 2025 (filed in 2026): maximum credit about $7,830 for workers with 3+ qualifying children. Smaller amounts for 0–2 children.",
			"eligibility": "Must have earned income, a valid SSN, and meet income caps that rise with family size (around $66k+ for married filers with 3 kids in recent years). Qualifying-child rules apply. File a federal return with Schedule EIC.",
			"incomeGuideline": "Varies by filing status and number of children. Childless workers have a much smaller credit and tighter age rules.",
			"available": "Nationwide. Many states also have a state EITC.",
			"howToApply": "File a federal tax return. Free help: IRS Volunteer Income Tax Assistance (VITA) and United Way MyFreeTaxes.",
			"website": "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc",
			"applyUrl": "https://www.irs.gov/credits-deductions/individuals/earned-income-tax-credit-eitc",
			"phone": "IRS 1-800-829-1040. VITA locator: 1-800-906-9887. MyFreeTaxes via United Way.",
			"timeline": "Refund after you file; IRS issues most EITC refunds starting late February due to fraud-prevention hold.",
			"cost": "Free if you use VITA / MyFreeTaxes. Do not pay a refund-anticipation loan shop a large fee.",
			"documents": [
				"W-2s/1099s",
				"SSNs for household",
				"child residency/relationship proof if asked"
			],
			"notes": "Must file even if you owe no tax. Keep wage statements. ITIN filers have special rules. State EITCs are extra money in many states including CA (CalEITC).",
			"logoUrl": "https://www.irs.gov/favicon.ico",
			"faviconUrl": "https://www.irs.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "eitc"
		},
		{
			"name": "Child Tax Credit (CTC) + Additional CTC",
			"directoryCategory": "Tax credits",
			"agency": "Internal Revenue Service",
			"programType": "Federal tax credit",
			"description": "Credit of up to $2,000 per qualifying child (amount subject to current tax law). Part may be refundable as the Additional Child Tax Credit.",
			"receive": "Up to $2,000 per qualifying child under current law; refundable portion is smaller and requires earned income.",
			"eligibility": "Qualifying child under age 17 with a valid SSN, who lives with you more than half the year. Income phaseouts at high incomes ($200k single / $400k married in recent law).",
			"incomeGuideline": "Available well into middle income; phases out at higher AGI.",
			"available": "Nationwide.",
			"howToApply": "File Form 1040. Use VITA if needed.",
			"website": "https://www.irs.gov/credits-deductions/individuals/child-tax-credit",
			"applyUrl": "https://www.irs.gov/credits-deductions/individuals/child-tax-credit",
			"phone": "1-800-829-1040",
			"timeline": "With your tax refund.",
			"cost": "Free to claim on your return.",
			"documents": ["Child SSNs", "proof of residency if audited"],
			"notes": "Rules have changed several times; confirm current-year amount at IRS.gov before filing.",
			"logoUrl": "https://www.irs.gov/favicon.ico",
			"faviconUrl": "https://www.irs.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "ctc"
		},
		{
			"name": "County General Assistance / General Relief",
			"directoryCategory": "Cash / Income",
			"agency": "County human-services departments",
			"programType": "State / county",
			"description": "Last-resort cash aid for adults without children who do not qualify for TANF or SSI. Completely local—some counties have it, some do not, amounts are small, and work or treatment conditions are common.",
			"receive": "Small monthly cash or voucher (often $200–$500 range where it exists). Sometimes housing vouchers or bus passes instead of cash.",
			"eligibility": "Very low income, typically able-bodied adults without dependents, residency in the county. Often requires workfare or job search. Immigrants and people with pending SSI may be served in some counties.",
			"incomeGuideline": "Near-zero countable income/resources.",
			"available": "Varies by state and county. California counties operate General Relief / GA.",
			"howToApply": "Apply at county welfare / social services office.",
			"website": "https://www.usa.gov/state-social-services",
			"applyUrl": "https://www.usa.gov/state-social-services",
			"phone": "County social services; or 211",
			"timeline": "Same week to 30 days depending on county.",
			"cost": "Free.",
			"documents": [
				"ID",
				"proof of county residence",
				"income/resources",
				"work-search log if required"
			],
			"notes": "Not a federal entitlement. Ask specifically—many people miss this because it is not advertised nationally.",
			"logoUrl": "https://www.usa.gov/favicon.ico",
			"faviconUrl": "https://www.usa.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "general-relief"
		},
		{
			"name": "LIHEAP (Low Income Home Energy Assistance Program)",
			"directoryCategory": "Bills / Utilities",
			"agency": "HHS Office of Community Services; state energy offices / Community Action Agencies",
			"programType": "Federal (state-administered)",
			"description": "Helps pay heating and cooling bills, prevent shutoffs, and sometimes fix or replace heating/cooling equipment. Payment usually goes straight to the utility.",
			"receive": "Typically $200–$1,500 per year depending on state, fuel type, and crisis status. Separate crisis benefit if you have a shutoff notice.",
			"eligibility": "Income generally ≤150% FPL (states may go up to 60% of state median income). Participation in SNAP, SSI, or TANF often helps. Must be responsible for heating/cooling costs.",
			"incomeGuideline": "Usually ≤150% FPL or ≤60% SMI. State charts published each program year.",
			"available": "All states, DC, territories, many Tribes. Open seasons differ (heating vs cooling).",
			"howToApply": "Apply through state LIHEAP office or local Community Action Agency. Some states accept online applications.",
			"website": "https://www.acf.hhs.gov/ocs/programs/liheap",
			"applyUrl": "https://www.usa.gov/help-with-energy-bills",
			"phone": "National Energy Assistance Referral: 1-866-674-6327. Or 211.",
			"timeline": "2–8 weeks for regular benefits. Crisis/shutoff cases faster (often 18–48 hours once complete).",
			"cost": "Free.",
			"documents": [
				"ID",
				"Social Security numbers",
				"recent utility bill",
				"proof of income",
				"shutoff notice if crisis"
			],
			"notes": "Funds run out—apply early in the season. One application may also screen you for Weatherization. Keep shutoff notices.",
			"logoUrl": "https://www.acf.hhs.gov/favicon.ico",
			"faviconUrl": "https://www.acf.hhs.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "liheap"
		},
		{
			"name": "Weatherization Assistance Program (WAP)",
			"directoryCategory": "Bills / Utilities",
			"agency": "U.S. Department of Energy; state WAP agencies",
			"programType": "Federal (state-administered)",
			"description": "Free home energy upgrades—insulation, air sealing, HVAC repair/replacement, some health-and-safety fixes—so bills stay lower long term.",
			"receive": "In-kind weatherization worth several thousand dollars. Not a cash payment.",
			"eligibility": "Income ≤200% FPL in most states, or automatic if you receive SSI, TANF, or similar. Home must be suitable (owner or landlord permission).",
			"incomeGuideline": "Typically ≤200% FPL.",
			"available": "Nationwide; waitlists common.",
			"howToApply": "Apply via state WAP office or Community Action Agency (often the same door as LIHEAP).",
			"website": "https://www.energy.gov/scep/wap/weatherization-assistance-program",
			"applyUrl": "https://www.usa.gov/help-with-energy-bills",
			"phone": "State WAP office; 211",
			"timeline": "Months to 1–2 years on waitlists. Audit then work scheduled.",
			"cost": "Free to eligible households.",
			"documents": [
				"Income proof",
				"proof of ownership or rental agreement + landlord permission",
				"utility bills"
			],
			"notes": "Renters can qualify with landlord consent. Not an emergency shutoff program—use LIHEAP crisis for that.",
			"logoUrl": "https://www.energy.gov/favicon.ico",
			"faviconUrl": "https://www.energy.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "weatherize"
		},
		{
			"name": "California CARE and FERA utility discounts",
			"directoryCategory": "Bills / Utilities",
			"agency": "California investor-owned utilities (SCE, PG&E, SDG&E, SoCalGas) overseen by CPUC",
			"programType": "State-regulated utility discount",
			"description": "Ongoing percentage discounts on electric and gas bills for qualifying California households. Separate from LIHEAP (you can stack them).",
			"receive": "CARE: typically ~30–35% off electric and 20% off gas. FERA: smaller discount for households just above CARE income (electric only, larger households).",
			"eligibility": "CARE: income at or below set guidelines OR enrollment in CalFresh, Medi-Cal, WIC, LIHEAP, SSI, etc. FERA: slightly higher income, 3+ person households.",
			"incomeGuideline": "Published annually by each utility; CARE roughly near 200% FPL.",
			"available": "California customers of participating utilities. Publicly owned utilities have similar programs under different names.",
			"howToApply": "Apply on your utility's website or by mail. Recertify every 1–2 years.",
			"website": "https://www.cpuc.ca.gov/consumer-support/financial-assistance-programs",
			"applyUrl": "https://www.sce.com/residential/assistance/care-fera",
			"phone": "Your utility CARE line, or 211",
			"timeline": "Often 1 billing cycle after approval.",
			"cost": "Free.",
			"documents": ["Account number", "income or program-enrollment proof"],
			"notes": "Ontario, CA is typically Southern California Edison + SoCalGas territory—apply with both. Also ask about Medical Baseline if someone in the home uses life-support equipment.",
			"logoUrl": "https://www.cpuc.ca.gov/favicon.ico",
			"faviconUrl": "https://www.cpuc.ca.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "care"
		},
		{
			"name": "Salvation Army Emergency Financial Assistance",
			"directoryCategory": "Bills / Utilities",
			"agency": "The Salvation Army",
			"programType": "Nonprofit",
			"description": "Local Salvation Army units may pay a portion of rent, utilities, prescriptions, or transportation in a documented emergency. Availability depends entirely on local donations and season.",
			"receive": "One-time vendor payment (utility or landlord paid directly). Amounts often $50–$300. Seasonal programs (coats, toys, food boxes) are more common than cash.",
			"eligibility": "Local rules. Usually proof of crisis (shutoff, eviction notice), ID, proof of income, and residence in the service area. First-come, first-served while funds last.",
			"incomeGuideline": "Low-income; locally defined.",
			"available": "Thousands of local corps nationwide. Services uneven.",
			"howToApply": "Call or walk into the nearest Salvation Army. Use location finder. Also call 211 for a referral.",
			"website": "https://www.salvationarmyusa.org",
			"applyUrl": "https://www.salvationarmyusa.org/usn/provide-housing/",
			"phone": "1-800-SAL-ARMY (1-800-725-2769) or local corps",
			"timeline": "Same day to 2 weeks. Funds often gone by mid-month.",
			"cost": "Free. Never pay a fee or buy a 'voucher.'",
			"documents": [
				"Photo ID",
				"Social Security cards",
				"lease",
				"utility bill",
				"shutoff/eviction notice",
				"proof of income"
			],
			"notes": "Ask about food pantry, clothing, Christmas assistance, and Pathway of Hope case management. Bring the actual shutoff/eviction notice.",
			"logoUrl": "https://www.salvationarmyusa.org/favicon.ico",
			"faviconUrl": "https://www.salvationarmyusa.org/favicon.ico",
			"asOf": "September 2026",
			"id": "salvation-army"
		},
		{
			"name": "Catholic Charities emergency assistance",
			"directoryCategory": "Bills / Utilities",
			"agency": "Catholic Charities USA member agencies",
			"programType": "Nonprofit",
			"description": "Diocesan agencies offer emergency rent/utility help, food, clothing, immigration legal aid, and case management. You do not need to be Catholic.",
			"receive": "Varies: one-time bill payment, food, shelter referral, counseling. Some dioceses run rapid-rehousing.",
			"eligibility": "Local. Typically a documented emergency and residence in the diocese. Income screens common.",
			"incomeGuideline": "Low-income; locally defined.",
			"available": "Most U.S. dioceses.",
			"howToApply": "Find your local agency via CCUSA locator and call for intake hours.",
			"website": "https://www.catholiccharitiesusa.org",
			"applyUrl": "https://www.catholiccharitiesusa.org/find-help/",
			"phone": "Local agency; or 211",
			"timeline": "Days to 3 weeks. Emergency slots limited.",
			"cost": "Free.",
			"documents": [
				"ID",
				"proof of residence",
				"bills",
				"income"
			],
			"notes": "Quality and funding vary by diocese. Ask about specialized programs (veterans, refugees, disaster).",
			"logoUrl": "https://www.catholiccharitiesusa.org/favicon.ico",
			"faviconUrl": "https://www.catholiccharitiesusa.org/favicon.ico",
			"asOf": "September 2026",
			"id": "catholic-charities"
		},
		{
			"name": "Society of St. Vincent de Paul",
			"directoryCategory": "Bills / Utilities",
			"agency": "National Council of the U.S. Society of St. Vincent de Paul",
			"programType": "Nonprofit (parish-based)",
			"description": "Volunteer 'Vincentians' visit homes and help with small emergency needs—rent, utilities, furniture, food, car repair—using parish conference funds.",
			"receive": "Modest, targeted help after a home visit. Not a large cash grant program.",
			"eligibility": "Need in the parish/conference area. No religious requirement.",
			"incomeGuideline": "Demonstrated need.",
			"available": "Parish conferences across the U.S.; coverage is patchy in rural areas.",
			"howToApply": "Call the local conference or diocesan council (finder on website) or 211.",
			"website": "https://ssvpusa.org",
			"applyUrl": "https://ssvpusa.org/need-help/",
			"phone": "Local conference; 211",
			"timeline": "Home visit often within 1–2 weeks.",
			"cost": "Free.",
			"documents": [
				"ID",
				"bills",
				"volunteers will discuss the situation in person"
			],
			"notes": "Very local and relationship-based. Good complement to LIHEAP/SNAP.",
			"logoUrl": "https://ssvpusa.org/favicon.ico",
			"faviconUrl": "https://ssvpusa.org/favicon.ico",
			"asOf": "September 2026",
			"id": "svdp"
		},
		{
			"name": "Community Action Agencies (CSBG)",
			"directoryCategory": "Bills / Utilities",
			"agency": "Local CAAs funded by HHS Community Services Block Grant",
			"programType": "Nonprofit / public (federally funded)",
			"description": "Nearly every county is covered by a Community Action Agency. They are the front door for LIHEAP, weatherization, emergency food, job programs, Head Start referrals, and local flexible aid.",
			"receive": "Depends on the agency: utility help, rent, car repairs, diapers, GED classes, tax prep, etc.",
			"eligibility": "Generally ≤125% FPL for CSBG-funded services; many programs use 150–200% FPL. Local flexibility.",
			"incomeGuideline": "Typically ≤125–200% FPL depending on the specific service.",
			"available": "Nationwide county coverage.",
			"howToApply": "Find your CAA via Community Action Partnership locator.",
			"website": "https://communityactionpartnership.com",
			"applyUrl": "https://communityactionpartnership.com/find-a-cap/",
			"phone": "Local CAA; 211",
			"timeline": "Walk-in or appointment; 1 day to several weeks.",
			"cost": "Free.",
			"documents": [
				"ID",
				"proof of income",
				"utility/rent bills"
			],
			"notes": "One of the most useful 'one-stop' doors. Ask them to screen you for every program they run.",
			"logoUrl": "https://communityactionpartnership.com/favicon.ico",
			"faviconUrl": "https://communityactionpartnership.com/favicon.ico",
			"asOf": "September 2026",
			"id": "csbg"
		},
		{
			"name": "FEMA Emergency Food and Shelter Program (EFSP)",
			"directoryCategory": "Bills / Utilities",
			"agency": "FEMA funded; local boards (often United Way) award to nonprofits",
			"programType": "Federal funds via local nonprofits",
			"description": "Not a program you apply to at FEMA.gov for everyday bills. Local nonprofits receive EFSP grants to provide food, mass shelter, short-term rent, and utility help (historically up to 90 days).",
			"receive": "Delivered as pantry food, shelter nights, or a rent/utility payment through a local agency.",
			"eligibility": "Set by the local funded agency. Generally people with a housing or food emergency.",
			"incomeGuideline": "Locally defined.",
			"available": "Nationwide via 14,000+ local agencies, funding permitting.",
			"howToApply": "Do not apply to FEMA for routine EFSP. Call 211 or a local United Way / food pantry / shelter that receives EFSP.",
			"website": "https://www.fema.gov",
			"applyUrl": "https://www.211.org",
			"phone": "211 or local United Way",
			"timeline": "Same as the local agency (days).",
			"cost": "Free.",
			"documents": ["Whatever the local agency requires"],
			"notes": "Separate from FEMA Individual Assistance, which is only after a presidentially declared disaster. FY2026 EFSP funding exists but future budgets are politically uncertain.",
			"logoUrl": "https://www.fema.gov/favicon.ico",
			"faviconUrl": "https://www.fema.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "fema-efsp"
		},
		{
			"name": "Lifeline (federal phone / internet discount)",
			"directoryCategory": "Phone / Internet",
			"agency": "FCC; administered by USAC",
			"programType": "Federal",
			"description": "Monthly discount on phone, internet, or bundled service for one connection per eligible household. Some providers advertise a 'free phone' because the discount covers a basic wireless plan. The Affordable Connectivity Program (ACP) ended in 2024; Lifeline remains.",
			"receive": "Up to $9.25/month off service ($34.25/month on qualifying Tribal lands). Many wireless carriers offer a free smartphone plus a limited-data plan when combined with Lifeline.",
			"eligibility": "Income ≤135% FPL OR enrollment in SNAP, Medicaid, SSI, Federal Public Housing / Section 8, Veterans Pension, or certain Tribal programs. One benefit per household.",
			"incomeGuideline": "2026 135% FPL examples (48 states): 1 person $21,546; 2 $29,214; 3 $36,882; 4 $44,550.",
			"available": "Nationwide. CA, TX, and OR have extra state application steps.",
			"howToApply": "Apply at LifelineSupport.org (National Verifier) or through a participating carrier (Assurance Wireless, SafeLink, TruConnect, etc.).",
			"website": "https://www.lifelinesupport.org",
			"applyUrl": "https://www.lifelinesupport.org/get-started/",
			"phone": "1-800-234-9473 | LifelineSupport@usac.org",
			"timeline": "Online application ~10 minutes. Approval can be same day to 1–2 weeks if documents are requested. Phone ships after a carrier enrolls you.",
			"cost": "Free to apply. Handset may be free or low-cost depending on carrier promotions. Never pay an 'activation fee' to a random Facebook ad.",
			"documents": [
				"Name",
				"DOB",
				"last 4 of SSN or Tribal ID",
				"address",
				"proof of program or income if National Verifier cannot auto-check"
			],
			"notes": "Recertify every year. ACP is gone—ignore ads that still promise the old $30 ACP benefit. California also has a separate, more generous California LifeLine.",
			"logoUrl": "https://www.lifelinesupport.org/favicon.ico",
			"faviconUrl": "https://www.lifelinesupport.org/favicon.ico",
			"asOf": "September 2026",
			"id": "lifeline"
		},
		{
			"name": "California LifeLine",
			"directoryCategory": "Phone / Internet",
			"agency": "California Public Utilities Commission",
			"programType": "State",
			"description": "California's own phone-discount program, separate from and often more generous than federal Lifeline. Can apply to wireless or home phone.",
			"receive": "Monthly service discount; many wireless carriers offer a free phone + service bundle to CA LifeLine customers.",
			"eligibility": "California resident. Income guidelines (higher than federal Lifeline) OR participation in CalFresh, Medi-Cal, WIC, LIHEAP, SSI, Tribal TANF, etc.",
			"incomeGuideline": "CPUC publishes annual income caps (higher than 135% FPL).",
			"available": "California only.",
			"howToApply": "Apply through a participating carrier or the California LifeLine administrator. Federal Lifeline in CA also routes through state processes.",
			"website": "https://www.californialifeline.com",
			"applyUrl": "https://www.californialifeline.com/en/application_form",
			"phone": "1-877-858-7463",
			"timeline": "1–3 weeks typical after carrier submits your form.",
			"cost": "Free.",
			"documents": [
				"CA address",
				"ID",
				"SSN or Tribal ID",
				"proof of program or income"
			],
			"notes": "Ontario, CA residents should apply for California LifeLine rather than only federal Lifeline. You generally cannot stack two Lifeline benefits in one household.",
			"logoUrl": "https://www.californialifeline.com/favicon.ico",
			"faviconUrl": "https://www.californialifeline.com/favicon.ico",
			"asOf": "September 2026",
			"id": "ca-lifeline"
		},
		{
			"name": "Housing Choice Voucher (Section 8)",
			"directoryCategory": "Housing",
			"agency": "HUD via local Public Housing Agencies (PHAs)",
			"programType": "Federal (locally administered)",
			"description": "Voucher that pays a large share of rent in the private market. You find a landlord who accepts Section 8. This is rental help—not a free house.",
			"receive": "PHA pays the landlord the difference between the payment standard and ~30% of your adjusted income. You pay the tenant share.",
			"eligibility": "Income generally ≤50% of Area Median Income; 75% of new vouchers must go to households ≤30% AMI. U.S. citizen or eligible immigration status. PHA screens criminal history.",
			"incomeGuideline": "HUD income limits by metro and household size (updated annually). Extremely-low-income preference is common.",
			"available": "Nationwide, but each PHA has its own waiting list. Many lists are closed for years.",
			"howToApply": "Apply to your local PHA when the waiting list is open. Search HUD PHA directory. Apply to multiple PHAs if rules allow.",
			"website": "https://www.hud.gov/helping-americans/",
			"applyUrl": "https://www.hud.gov/program_offices/public_indian_housing/pha/contacts",
			"phone": "HUD 1-800-955-2232. Local PHA.",
			"timeline": "Waiting lists commonly 1–8+ years. Once issued a voucher you typically have 60–120 days to lease a unit.",
			"cost": "Free to apply.",
			"documents": [
				"IDs",
				"SSNs",
				"birth certificates",
				"income",
				"assets",
				"landlord history",
				"immigration documents"
			],
			"notes": "Ontario, CA is served by Housing Authority of the County of San Bernardino and nearby PHAs. Watch list-opening announcements. Portability rules apply if you move.",
			"logoUrl": "https://www.hud.gov/favicon.ico",
			"faviconUrl": "https://www.hud.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "section8"
		},
		{
			"name": "Public Housing",
			"directoryCategory": "Housing",
			"agency": "HUD via local PHAs",
			"programType": "Federal (locally administered)",
			"description": "PHA-owned apartments with rent set at about 30% of adjusted income. Units are in designated public-housing communities—not a free deeded house.",
			"receive": "Subsidized rent in a PHA-owned unit. Some sites include utilities.",
			"eligibility": "Low-income (usually ≤80% AMI, with priority for much lower incomes), eligible immigration status, local preferences, screening.",
			"incomeGuideline": "HUD limits by area.",
			"available": "Communities with public-housing stock. Inventory has shrunk in many cities.",
			"howToApply": "Apply through the local PHA (often the same portal as Section 8).",
			"website": "https://www.hud.gov/helping-americans/",
			"applyUrl": "https://www.hud.gov/program_offices/public_indian_housing/pha/contacts",
			"phone": "Local PHA; HUD 1-800-955-2232",
			"timeline": "Waiting lists often years.",
			"cost": "Free to apply.",
			"documents": ["Same family of documents as Section 8"],
			"notes": "Ask the PHA about project-based vouchers and tax-credit (LIHTC) properties too.",
			"logoUrl": "https://www.hud.gov/favicon.ico",
			"faviconUrl": "https://www.hud.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "public-housing"
		},
		{
			"name": "HUD-VASH (Veterans Affairs Supportive Housing)",
			"directoryCategory": "Housing",
			"agency": "HUD + U.S. Department of Veterans Affairs",
			"programType": "Federal",
			"description": "Section 8-style voucher plus VA case management for veterans who are homeless or at risk.",
			"receive": "Rental voucher + supportive services.",
			"eligibility": "Veteran eligible for VA healthcare (generally) who is homeless or at imminent risk, and meets voucher income rules.",
			"incomeGuideline": "HUD voucher income rules.",
			"available": "Areas with VASH allocations.",
			"howToApply": "Start with VA homeless services / HUD-VASH coordinator at your VA medical center, or the National Call Center for Homeless Veterans.",
			"website": "https://www.va.gov/homeless/hud-vash.asp",
			"applyUrl": "https://www.va.gov/homeless/hud-vash.asp",
			"phone": "National Call Center for Homeless Veterans: 1-877-424-3838",
			"timeline": "Faster than regular Section 8 in many areas, but still depends on voucher availability and unit search.",
			"cost": "Free.",
			"documents": [
				"DD-214",
				"VA enrollment",
				"income",
				"homelessness documentation"
			],
			"notes": "Also ask about SSVF (Supportive Services for Veteran Families) for short-term rent/utility help.",
			"logoUrl": "https://www.va.gov/favicon.ico",
			"faviconUrl": "https://www.va.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "hud-vash"
		},
		{
			"name": "Continuum of Care / Emergency Solutions Grants (homelessness system)",
			"directoryCategory": "Housing",
			"agency": "HUD-funded local Continuums of Care, shelters, and rapid-rehousing providers",
			"programType": "Federal via local nonprofits",
			"description": "The coordinated-entry system for people experiencing homelessness: emergency shelter, transitional housing, rapid rehousing, and permanent supportive housing.",
			"receive": "Shelter bed, short-term rental help, or a long-term supportive-housing slot—not a free house to own.",
			"eligibility": "Literally homeless or fleeing domestic violence for many ESG/CoC components. Chronic-homeless definition for PSH. Coordinated entry assessment required.",
			"incomeGuideline": "Very low / none for shelter. Rapid rehousing has local targeting.",
			"available": "Every community has a CoC; quality varies.",
			"howToApply": "Call 211, go to the local coordinated-entry access point, or contact a shelter. Do not apply on HUD.gov as an individual for CoC grants.",
			"website": "https://www.hudexchange.info/programs/coc/",
			"applyUrl": "https://www.211.org",
			"phone": "211; local homeless hotline",
			"timeline": "Shelter: same night if a bed is open (often waitlists). Rapid rehousing: weeks to months. PSH: many months to years.",
			"cost": "Free.",
			"documents": ["ID if available", "assessment interview is the main step"],
			"notes": "If you are fleeing DV, contact the National Domestic Violence Hotline 1-800-799-7233—there are confidential housing paths.",
			"logoUrl": "https://www.hud.gov/favicon.ico",
			"faviconUrl": "https://www.hud.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "continuum-of-care"
		},
		{
			"name": "USDA Section 502 Direct & 504 Rural Housing",
			"directoryCategory": "Housing",
			"agency": "USDA Rural Development",
			"programType": "Federal",
			"description": "Subsidized mortgages (502 Direct) and home-repair grants/loans for very-low-income elderly homeowners (504) in eligible rural areas. Not available in most urban neighborhoods.",
			"receive": "502: low-interest mortgage that can drop toward 1% with payment assistance. 504: up to $10,000 grant (age 62+) or $40,000 loan for repairs to remove health/safety hazards.",
			"eligibility": "Property must be in a USDA-eligible rural area. Income limits apply (low / very-low). Credit and repayment ability required for loans. 504 grants are for 62+ very-low-income owners.",
			"incomeGuideline": "USDA county income limits.",
			"available": "Rural and some small-town areas only. Check USDA eligibility map. Ontario, CA is generally NOT rural-eligible.",
			"howToApply": "Apply at local USDA Rural Development office.",
			"website": "https://www.rd.usda.gov/programs-services/single-family-housing-programs",
			"applyUrl": "https://www.rd.usda.gov/programs-services/single-family-housing-programs/single-family-housing-direct-home-loans",
			"phone": "USDA RD state office",
			"timeline": "Months. Packaging nonprofits can help.",
			"cost": "No application fee at USDA; closing costs still exist (sometimes packaged into the loan).",
			"documents": [
				"Income",
				"tax returns",
				"credit",
				"property info"
			],
			"notes": "Use the USDA property-eligibility site before applying. Mutual Self-Help Housing is a related sweat-equity program in some rural counties.",
			"logoUrl": "https://www.rd.usda.gov/favicon.ico",
			"faviconUrl": "https://www.rd.usda.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "usda-rural"
		},
		{
			"name": "Habitat for Humanity homeownership",
			"directoryCategory": "Housing",
			"agency": "Habitat for Humanity International + local affiliates",
			"programType": "Nonprofit",
			"description": "Affordable mortgage (often 0% interest) after sweat equity and homeowner education. Not a free house. You must be able to pay the mortgage.",
			"receive": "A modest house with an affordable (often 0-interest) Habitat mortgage. You build sweat equity and then make monthly payments that recycle into more homes. You do not receive a free deed.",
			"eligibility": "Need for adequate housing (cost burden >30%, substandard unit, etc.), income typically up to 60% AMI (local affiliates set min/max), willingness to complete sweat-equity hours, ability to pay, acceptable credit/debt ratios, legal residency. Local connection often required.",
			"incomeGuideline": "Local AMI bands. Example ranges often sit between a floor (ability to pay) and ~60% AMI cap.",
			"available": "Local affiliates nationwide. Application windows open periodically—not year-round.",
			"howToApply": "Contact your local Habitat affiliate. National number can route you.",
			"website": "https://www.habitat.org",
			"applyUrl": "https://www.habitat.org/housing-help/apply",
			"phone": "1-800-422-4828",
			"timeline": "Application windows are short. From selection to move-in often 12–24+ months including sweat equity.",
			"cost": "Closing costs and a modest down payment (sometimes a few hundred to a few thousand). Monthly mortgage thereafter. Sweat equity (often 200–400 hours).",
			"documents": [
				"IDs",
				"2 years taxes",
				"pay stubs",
				"bank statements",
				"landlord history",
				"credit authorization"
			],
			"notes": "ReStores sell donated furniture/building materials cheaply even if you are not a homebuyer. Do not pay anyone who claims they can 'get you a Habitat house' for a fee.",
			"logoUrl": "https://www.habitat.org/favicon.ico",
			"faviconUrl": "https://www.habitat.org/favicon.ico",
			"asOf": "September 2026",
			"id": "habitat"
		},
		{
			"name": "Free Charity Cars (1-800-Charity Cars)",
			"directoryCategory": "Vehicles / Transportation",
			"agency": "Charity Cars, Inc. (Free Charity Cars)",
			"programType": "Nonprofit",
			"description": "National donated-vehicle program. Applicants create a profile; when a suitable donated car appears in an area, recent applications are reviewed. Demand far exceeds supply.",
			"receive": "A used donated vehicle. Sometimes help with plates/insurance is mentioned; do not count on extras.",
			"eligibility": "Demonstrated need (work, medical, education, fleeing DV). Valid license. Low income. Ability to insure and register the vehicle. Applications expire after ~3 months and must be renewed.",
			"incomeGuideline": "Low-income / financial hardship (organization reviews story + docs).",
			"available": "Nationwide in theory; awards cluster where donations occur.",
			"howToApply": "Read FAQ, then submit the vehicle request form. Reapply every 3 months. Sharing donation appeals on social media is encouraged by the charity.",
			"website": "https://freecharitycars.org",
			"applyUrl": "https://freecharitycars.org/vehicle-request-form/",
			"phone": "1-800-242-7489",
			"timeline": "Often 6–18 months if selected at all. Many applicants are never matched. Not an emergency program.",
			"cost": "Free to apply. You will owe registration, insurance, and future repairs.",
			"documents": [
				"License",
				"proof of income/need",
				"story",
				"additional docs if shortlisted"
			],
			"notes": "High-scam space. Confirm you are on freecharitycars.org / 800charitycars.org. Never pay a 'processing fee' or ship money for a car you have not seen.",
			"logoUrl": "https://freecharitycars.org/favicon.ico",
			"faviconUrl": "https://freecharitycars.org/favicon.ico",
			"asOf": "September 2026",
			"id": "charity-cars"
		},
		{
			"name": "Vehicles for Change",
			"directoryCategory": "Vehicles / Transportation",
			"agency": "Vehicles for Change, Inc.",
			"programType": "Nonprofit",
			"description": "Awards refurbished cars to working families, usually at a deeply subsidized price (sometimes near $950) and occasionally free via sponsors. Stronger presence in MD, VA, DC, MI and partner regions.",
			"receive": "Inspected used car + access to nonprofit repair shops in some locations.",
			"eligibility": "Typically referred by a partner agency. Stable employment (~30+ hours/week), valid license, ability to pay a small award fee and insurance, income limits.",
			"incomeGuideline": "Low-income working families.",
			"available": "Primarily Mid-Atlantic and partner states—not every state.",
			"howToApply": "Get a referral from a partner social-service agency; then apply.",
			"website": "https://www.vehiclesforchange.org",
			"applyUrl": "https://www.vehiclesforchange.org",
			"phone": "See website contact (Maryland HQ)",
			"timeline": "30–90 days after a complete referred application, if a car is available.",
			"cost": "Often a low award fee rather than $0. Budget for insurance immediately.",
			"documents": [
				"Referral",
				"license",
				"proof of employment and income",
				"insurance ability"
			],
			"notes": "More reliable than purely 'vote for my story' models, but geographic limits apply.",
			"logoUrl": "https://www.vehiclesforchange.org/favicon.ico",
			"faviconUrl": "https://www.vehiclesforchange.org/favicon.ico",
			"asOf": "September 2026",
			"id": "vehicles-for-change"
		},
		{
			"name": "Working Cars for Working Families (program directory)",
			"directoryCategory": "Vehicles / Transportation",
			"agency": "National Consumer Law Center (directory of 100+ local nonprofits)",
			"programType": "Directory of nonprofits",
			"description": "Not a car giver itself. NCLC maintains a state-by-state list of nonprofits that donate cars, make car loans, or run matched-savings for a down payment.",
			"receive": "A map to local programs that actually operate near you.",
			"eligibility": "Set by each listed program. Most target working low-wage families.",
			"incomeGuideline": "Program-specific.",
			"available": "100+ programs across many states (coverage is uneven).",
			"howToApply": "Open the NCLC finder and contact the program in your state.",
			"website": "https://www.nclc.org/find-a-car-program/",
			"applyUrl": "https://www.nclc.org/find-a-car-program/",
			"phone": "Contact the local program listed",
			"timeline": "Varies by program (weeks to many months).",
			"cost": "Free directory. Individual programs may charge a small award fee or offer a loan.",
			"documents": ["Depends on the local program"],
			"notes": "Best starting point for 'free or cheap car' searches after checking TANF diversion and local CAAs.",
			"logoUrl": "https://www.nclc.org/favicon.ico",
			"faviconUrl": "https://www.nclc.org/favicon.ico",
			"asOf": "September 2026",
			"id": "nclc-cars"
		},
		{
			"name": "VA Automobile Allowance and Adaptive Equipment",
			"directoryCategory": "Vehicles / Transportation",
			"agency": "U.S. Department of Veterans Affairs",
			"programType": "Federal (veterans)",
			"description": "Grant toward a vehicle plus adaptive equipment for veterans and some service members with specific service-connected disabilities (loss of limbs, severe burns, ankylosis, etc.).",
			"receive": "A substantial one-time (generally every few years per statute) grant—recent amounts have been in the mid-$20,000s and are adjusted. Plus adaptive equipment.",
			"eligibility": "Qualifying service-connected disability listed in VA regulations. Not a general low-income car program.",
			"incomeGuideline": "Not income-tested; disability-rated.",
			"available": "Nationwide for eligible veterans.",
			"howToApply": "File VA Form 21-4502 through VA.",
			"website": "https://www.va.gov/disability/eligibility/special-claims/automobile-allowance-adaptive-equipment/",
			"applyUrl": "https://www.va.gov/disability/eligibility/special-claims/automobile-allowance-adaptive-equipment/",
			"phone": "1-800-827-1000",
			"timeline": "Months, tied to claims processing.",
			"cost": "Free to apply.",
			"documents": ["VA disability rating evidence", "Form 21-4502"],
			"notes": "Very specific medical criteria. Ask a VSO (DAV, VFW, American Legion) for help filing.",
			"logoUrl": "https://www.va.gov/favicon.ico",
			"faviconUrl": "https://www.va.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "va-auto"
		},
		{
			"name": "United Way Ride United (essential rides)",
			"directoryCategory": "Vehicles / Transportation",
			"agency": "United Way Worldwide + 211 + Lyft partnership",
			"programType": "Nonprofit",
			"description": "Not a free car. Free or discounted rides to essential appointments (food, jobs, medical, housing) in communities where the program is active.",
			"receive": "Individual Lyft (or similar) rides booked through 211.",
			"eligibility": "211 screening; essential trip purpose; program available in that 211 area.",
			"incomeGuideline": "Need-based; locally screened.",
			"available": "Selected 211 markets—not universal.",
			"howToApply": "Call 211 and ask for Ride United / transportation assistance.",
			"website": "https://www.unitedway.org/ride-united",
			"applyUrl": "https://www.211.org",
			"phone": "211",
			"timeline": "Same day if the program is funded locally.",
			"cost": "Free or reduced to the rider.",
			"documents": ["211 intake only"],
			"notes": "Use this while waiting on a car program. Also ask Medicaid/Medi-Cal about non-emergency medical transportation.",
			"logoUrl": "https://www.unitedway.org/favicon.ico",
			"faviconUrl": "https://www.unitedway.org/favicon.ico",
			"asOf": "September 2026",
			"id": "ride-united"
		},
		{
			"name": "Dress for Success",
			"directoryCategory": "Clothing",
			"agency": "Dress for Success Worldwide + local affiliates",
			"programType": "Nonprofit",
			"description": "Professional clothing and career services for women entering or re-entering the workforce.",
			"receive": "Interview outfit and often a working wardrobe after hiring; coaching and job-readiness support.",
			"eligibility": "Women referred by a partner agency (workforce center, shelter, community college, parole program, etc.). Local affiliates set details.",
			"incomeGuideline": "Typically low-income job seekers.",
			"available": "Many U.S. cities; not every town.",
			"howToApply": "Get a referral from a partner organization, then book through the local affiliate.",
			"website": "https://dressforsuccess.org",
			"applyUrl": "https://dressforsuccess.org/get-help/",
			"phone": "Local affiliate listed on site",
			"timeline": "1–3 weeks after referral for a boutique appointment.",
			"cost": "Free to clients.",
			"documents": [
				"Referral form",
				"ID",
				"interview/job documentation helps"
			],
			"notes": "Men: see Career Gear or local workforce clothing closets. Call 211 for a closet if no affiliate exists.",
			"logoUrl": "https://dressforsuccess.org/favicon.ico",
			"faviconUrl": "https://dressforsuccess.org/favicon.ico",
			"asOf": "September 2026",
			"id": "dress-for-success"
		},
		{
			"name": "Career Gear",
			"directoryCategory": "Clothing",
			"agency": "Career Gear, Inc.",
			"programType": "Nonprofit",
			"description": "Professional clothing and coaching for men seeking employment, historically concentrated in a few cities.",
			"receive": "Interview attire and follow-up career support.",
			"eligibility": "Men referred by partner agencies; local capacity limits.",
			"incomeGuideline": "Low-income job seekers.",
			"available": "Limited cities—confirm current locations on the site.",
			"howToApply": "Partner-agency referral.",
			"website": "https://www.careergear.org",
			"applyUrl": "https://www.careergear.org",
			"phone": "See website",
			"timeline": "Depends on affiliate calendar.",
			"cost": "Free to clients.",
			"documents": ["Referral"],
			"notes": "If no Career Gear nearby, ask the American Job Center / EDD and 211 for a men's clothing closet.",
			"logoUrl": "https://www.careergear.org/favicon.ico",
			"faviconUrl": "https://www.careergear.org/favicon.ico",
			"asOf": "September 2026",
			"id": "career-gear"
		},
		{
			"name": "Goodwill / Salvation Army / local clothing closets",
			"directoryCategory": "Clothing",
			"agency": "Goodwill Industries, Salvation Army, churches, school closets",
			"programType": "Nonprofit / community",
			"description": "Everyday free or voucher-based clothing. Thrift stores are not free, but many agencies issue vouchers, and standalone 'clothing closets' give items at no cost.",
			"receive": "Clothing, shoes, sometimes household goods. Seasonal coat programs (One Warm Coat and local drives) in winter.",
			"eligibility": "Closets: usually walk-in with ID and local address. Voucher programs: referral from a caseworker.",
			"incomeGuideline": "Need-based.",
			"available": "Nearly every community has at least one closet or voucher source.",
			"howToApply": "Call 211 and ask for a clothing closet. School counselors often have closets for students.",
			"website": "https://www.211.org",
			"applyUrl": "https://www.211.org",
			"phone": "211",
			"timeline": "Same day.",
			"cost": "Free at closets. Thrift purchases are low-cost, not free.",
			"documents": ["Photo ID and proof of address at many sites"],
			"notes": "One Warm Coat (onewarmcoat.org) organizes free winter-coat distributions through local partners.",
			"logoUrl": "https://www.211.org/favicon.ico",
			"faviconUrl": "https://www.211.org/favicon.ico",
			"asOf": "September 2026",
			"id": "clothing-closets"
		},
		{
			"name": "New Eyes (prescription eyeglasses)",
			"directoryCategory": "Vision / Glasses",
			"agency": "New Eyes for the Needy",
			"programType": "Nonprofit",
			"description": "Provides a basic pair of new prescription glasses (single vision or lined bifocal) via an e-voucher that you redeem on their ordering site. Does not pay for the eye exam itself.",
			"receive": "One basic pair of glasses + shipping. Paid upgrades (progressives, tints, blue-light) available out of pocket.",
			"eligibility": "U.S. resident, income generally ≤250% FPL, prescription (with PD) dated within 24 months, no other resource for glasses. Available in most states (see current list on site).",
			"incomeGuideline": "≤250% FPL or proof of need (SNAP, unemployment, tax return, etc.).",
			"available": "Most U.S. states. Confirm current state list on new-eyes.org.",
			"howToApply": "Best: a social worker applies on your behalf. Individuals may apply directly. Small non-refundable application fee.",
			"website": "https://new-eyes.org",
			"applyUrl": "https://new-eyes.org/application",
			"phone": "973-376-4903 | info@new-eyes.org",
			"timeline": "Email response often within 1 business day; glasses after approval and order (1–3 weeks typical).",
			"cost": "Small non-refundable application fee (recently $15) for admin costs. Glasses themselves are free if approved.",
			"documents": ["Prescription with PD", "proof of income/need"],
			"notes": "Get a current exam + PD first (Medicaid/Medi-Cal, free clinic, Lions, or Vision USA). New Eyes is glasses, not surgery or contacts.",
			"logoUrl": "https://new-eyes.org/favicon.ico",
			"faviconUrl": "https://new-eyes.org/favicon.ico",
			"asOf": "September 2026",
			"id": "new-eyes"
		},
		{
			"name": "Lions Clubs International (local eye care & glasses)",
			"directoryCategory": "Vision / Glasses",
			"agency": "Lions Clubs International + local clubs",
			"programType": "Nonprofit",
			"description": "Local Lions clubs pay for exams, glasses, and sometimes hearing aids or eye surgery for residents who apply through the club. This is the most widespread community vision-aid network.",
			"receive": "Varies by club: exam, frames/lenses, surgery referral, recycled-glasses programs.",
			"eligibility": "Local resident with financial need and no (or inadequate) vision insurance. Clubs set income screens (often ~200% FPL).",
			"incomeGuideline": "Locally defined; commonly around 200% FPL.",
			"available": "Almost every U.S. community has a Lions club. Capacity is volunteer-limited.",
			"howToApply": "Use the Lions club locator, then call or email the local club's sight chair. A caseworker referral helps.",
			"website": "https://www.lionsclubs.org",
			"applyUrl": "https://www.lionsclubs.org/en/start-our-approach/club-locator",
			"phone": "630-571-5466 or local club",
			"timeline": "Weeks to a few months. Clubs meet monthly and funds are limited.",
			"cost": "Free to applicant when approved.",
			"documents": [
				"ID",
				"proof of residence and income",
				"recent prescription or need for an exam"
			],
			"notes": "Also used as the referring nonprofit for some OneSight / Luxottica voucher programs at LensCrafters or Target Optical.",
			"logoUrl": "https://www.lionsclubs.org/favicon.ico",
			"faviconUrl": "https://www.lionsclubs.org/favicon.ico",
			"asOf": "September 2026",
			"id": "lions"
		},
		{
			"name": "VSP Eyes of Hope / Sight for Students",
			"directoryCategory": "Vision / Glasses",
			"agency": "VSP Vision",
			"programType": "Nonprofit arm of a vision plan",
			"description": "No-cost exams and glasses for uninsured children (Sight for Students) and some uninsured adults (Eyes of Hope), issued through community partners—not a public walk-in clinic.",
			"receive": "Eye exam + glasses at a VSP provider.",
			"eligibility": "Limited income, no vision insurance. Children 18 and under for Sight for Students. Adults via partner referral for Eyes of Hope.",
			"incomeGuideline": "Household income limits set by VSP (low-income / uninsured).",
			"available": "Nationwide through partner organizations (schools, nonprofits).",
			"howToApply": "Ask a school nurse, social worker, or community partner to request a voucher. Individuals generally cannot apply solo on the public website.",
			"website": "https://www.vsp.com/eyes-of-hope",
			"applyUrl": "https://www.vsp.com/eyes-of-hope",
			"phone": "Sight for Students: 1-888-290-4964",
			"timeline": "Depends on partner voucher inventory; often 2–6 weeks.",
			"cost": "Free to approved patients.",
			"documents": ["Partner referral", "proof of no insurance and income"],
			"notes": "Start with the school nurse for kids. Adults should try Lions + New Eyes in parallel.",
			"logoUrl": "https://www.vsp.com/favicon.ico",
			"faviconUrl": "https://www.vsp.com/favicon.ico",
			"asOf": "September 2026",
			"id": "vsp-eyes"
		},
		{
			"name": "Prevent Blindness & NEI free/low-cost care directory",
			"directoryCategory": "Vision / Glasses",
			"agency": "Prevent Blindness; National Eye Institute resource list",
			"programType": "Nonprofit / federal information",
			"description": "Information hubs that point to free exams, glasses, glaucoma and cataract programs (Mission Cataract USA, Operation Sight, AGS Cares).",
			"receive": "Referrals; some affiliates run clinics.",
			"eligibility": "Program-specific (uninsured, income, medical indication).",
			"incomeGuideline": "Typically low-income / uninsured.",
			"available": "Varies by program.",
			"howToApply": "Use NEI's free-care page and Prevent Blindness local affiliates.",
			"website": "https://www.nei.nih.gov/eye-health-information/healthy-vision/finding-eye-doctor/get-free-or-low-cost-eye-care",
			"applyUrl": "https://preventblindness.org",
			"phone": "Prevent Blindness 1-800-331-2020",
			"timeline": "Varies.",
			"cost": "Free information; services free or low-cost if accepted.",
			"documents": ["Program-specific"],
			"notes": "Mission Cataract USA and Operation Sight are for cataract surgery, not routine glasses.",
			"logoUrl": "https://www.nei.nih.gov/favicon.ico",
			"faviconUrl": "https://www.nei.nih.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "prevent-blindness"
		},
		{
			"name": "Medicaid / Medi-Cal",
			"directoryCategory": "Health coverage",
			"agency": "HHS CMS; state Medicaid agencies (Medi-Cal in California)",
			"programType": "Federal-state",
			"description": "Health coverage for low-income people. In expansion states (including CA) most adults up to 138% FPL qualify. Often covers glasses for children; adult vision varies by state (CA Medi-Cal has limited adult optical benefits).",
			"receive": "Comprehensive medical coverage. May include vision, dental, non-emergency medical transportation, and long-term care depending on state and category.",
			"eligibility": "Income (MAGI) up to 138% FPL for most adults in expansion states; higher for children/pregnant people. Aged/blind/disabled pathways have different rules. Citizenship/immigration rules apply (emergency Medicaid is narrower).",
			"incomeGuideline": "138% FPL for ACA-expansion adults. Children and pregnant people have higher caps via CHIP/Medicaid.",
			"available": "All states; eligibility much broader in expansion states.",
			"howToApply": "HealthCare.gov or state portal. California: BenefitsCal or CoveredCA. Retroactive coverage possible.",
			"website": "https://www.medicaid.gov",
			"applyUrl": "https://www.healthcare.gov",
			"phone": "1-800-318-2596. CA Medi-Cal: 1-800-541-5555",
			"timeline": "45 days standard (90 for disability determinations). Emergency coverage faster.",
			"cost": "Free or very low premiums/copays.",
			"documents": [
				"IDs",
				"SSNs/immigration docs",
				"income (pay stubs",
				"taxes)",
				"residency"
			],
			"notes": "Apply even if you think you earn a little too much—deductions and household rules surprise people. Kids in mixed-status families can often get coverage.",
			"logoUrl": "https://www.medicaid.gov/favicon.ico",
			"faviconUrl": "https://www.medicaid.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "medi-cal"
		},
		{
			"name": "Children's Health Insurance Program (CHIP)",
			"directoryCategory": "Health coverage",
			"agency": "State Medicaid/CHIP agencies",
			"programType": "Federal-state",
			"description": "Low-cost or free coverage for children (and pregnant people in some states) whose family income is too high for Medicaid but still modest.",
			"receive": "Comprehensive child health coverage, usually including dental and vision.",
			"eligibility": "Children under 19 (sometimes 21) in families above Medicaid but below state CHIP caps (often 200–300%+ FPL).",
			"incomeGuideline": "State-specific; higher than adult Medicaid.",
			"available": "All states.",
			"howToApply": "Same application as Medicaid (HealthCare.gov / BenefitsCal).",
			"website": "https://www.insurekidsnow.gov",
			"applyUrl": "https://www.insurekidsnow.gov",
			"phone": "1-877-KIDS-NOW (1-877-543-7669)",
			"timeline": "Similar to Medicaid (weeks).",
			"cost": "Free or small premium depending on income and state.",
			"documents": ["Same as Medicaid application"],
			"notes": "Always apply for children even if parents are over-income for Medi-Cal.",
			"logoUrl": "https://www.insurekidsnow.gov/favicon.ico",
			"faviconUrl": "https://www.insurekidsnow.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "chip"
		},
		{
			"name": "Benefits.gov Benefit Finder",
			"directoryCategory": "Directories / Navigators",
			"agency": "U.S. General Services Administration / partner agencies",
			"programType": "Federal directory",
			"description": "Official questionnaire that matches you to 1,000+ federal and some state benefit programs. Does not itself pay benefits.",
			"receive": "Personalized list of programs and links to apply.",
			"eligibility": "Anyone can use the tool.",
			"incomeGuideline": "N/A — screening tool.",
			"available": "United States.",
			"howToApply": "Answer questions at Benefits.gov.",
			"website": "https://www.benefits.gov",
			"applyUrl": "https://www.benefits.gov/benefit-finder",
			"phone": "See each program listed",
			"timeline": "10–20 minutes for the quiz.",
			"cost": "Free.",
			"documents": ["None for the quiz"],
			"notes": "Best official starting point together with 211 and your state benefits portal.",
			"logoUrl": "https://www.benefits.gov/favicon.ico",
			"faviconUrl": "https://www.benefits.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "benefits-gov"
		},
		{
			"name": "211 (United Way)",
			"directoryCategory": "Directories / Navigators",
			"agency": "Local 211 providers; United Way network",
			"programType": "Nonprofit navigator",
			"description": "Free 24/7 confidential helpline and website that refers you to local food, rent, utility, clothing, transportation, childcare, and crisis programs. The single most useful phone number after 911.",
			"receive": "Live referral to real local programs, including ones too small to appear in national lists.",
			"eligibility": "Anyone.",
			"incomeGuideline": "N/A.",
			"available": "99% of the U.S. Available in 180+ languages.",
			"howToApply": "Dial 211, text your ZIP to 898211 in many areas, or search 211.org.",
			"website": "https://www.211.org",
			"applyUrl": "https://www.211.org",
			"phone": "211",
			"timeline": "Immediate referral. The underlying program then has its own wait.",
			"cost": "Free.",
			"documents": ["None"],
			"notes": "Call again if your situation changes. Ask the specialist to screen for ALL basic-needs programs, not just the one you mentioned.",
			"logoUrl": "https://www.211.org/favicon.ico",
			"faviconUrl": "https://www.211.org/favicon.ico",
			"asOf": "September 2026",
			"id": "uw211"
		},
		{
			"name": "findhelp.org (Aunt Bertha)",
			"directoryCategory": "Directories / Navigators",
			"agency": "findhelp (Aunt Bertha)",
			"programType": "Nonprofit / public-benefit directory",
			"description": "Searchable map of local social-service programs by ZIP code—food, housing, goods, transit, education, legal.",
			"receive": "Self-serve directory with program phone numbers and websites.",
			"eligibility": "Anyone can search.",
			"incomeGuideline": "N/A.",
			"available": "U.S.",
			"howToApply": "Enter your ZIP at findhelp.org.",
			"website": "https://www.findhelp.org",
			"applyUrl": "https://www.findhelp.org",
			"phone": "Listed per program",
			"timeline": "Immediate search.",
			"cost": "Free.",
			"documents": ["None for search"],
			"notes": "Good backup when 211 hold times are long. Confirm the program is still open before traveling there.",
			"logoUrl": "https://www.findhelp.org/favicon.ico",
			"faviconUrl": "https://www.findhelp.org/favicon.ico",
			"asOf": "September 2026",
			"id": "findhelp"
		},
		{
			"name": "BenefitsCal (California combined application)",
			"directoryCategory": "Directories / Navigators",
			"agency": "California Department of Social Services / counties",
			"programType": "State portal",
			"description": "One online application for CalFresh (SNAP), CalWORKs (TANF), Medi-Cal, and some other county benefits. Essential for Ontario, CA residents.",
			"receive": "Single door for the big three California safety-net programs.",
			"eligibility": "California residents applying for those programs.",
			"incomeGuideline": "Per each program.",
			"available": "California.",
			"howToApply": "Create an account at BenefitsCal.com. You can also apply in person at the San Bernardino County Transitional Assistance Department.",
			"website": "https://www.benefitscal.com",
			"applyUrl": "https://www.benefitscal.com",
			"phone": "County TAD. Statewide CalFresh: 1-877-847-3663",
			"timeline": "Same as the underlying programs (7–45 days).",
			"cost": "Free.",
			"documents": [
				"ID",
				"SSNs",
				"income",
				"rent",
				"immigration docs",
				"pregnancy/child info"
			],
			"notes": "After submitting, watch your BenefitsCal messages and mail. Upload documents quickly to avoid delay.",
			"logoUrl": "https://www.benefitscal.com/favicon.ico",
			"faviconUrl": "https://www.benefitscal.com/favicon.ico",
			"asOf": "September 2026",
			"id": "benefitscal"
		},
		{
			"name": "IRS VITA / TCE free tax preparation",
			"directoryCategory": "Tax credits",
			"agency": "IRS + local nonprofits / AARP Foundation Tax-Aide",
			"programType": "Federal volunteer program",
			"description": "Free tax filing so you can claim EITC, CTC, CalEITC, and other credits without paying a preparer.",
			"receive": "Accurate free return and faster access to refundable credits.",
			"eligibility": "VITA: generally moderate income (recently around $64,000 and below) or simple returns. TCE/Tax-Aide focuses on seniors.",
			"incomeGuideline": "VITA income cap set annually.",
			"available": "Sites nationwide, seasonal (late January–April, some year-round).",
			"howToApply": "IRS VITA locator or AARP Tax-Aide locator.",
			"website": "https://www.irs.gov/individuals/free-tax-return-preparation-for-qualifying-taxpayers",
			"applyUrl": "https://irs.treasury.gov/freetaxprep/",
			"phone": "1-800-906-9887",
			"timeline": "Appointment during tax season; refund per IRS calendar.",
			"cost": "Free. Never pay a VITA site.",
			"documents": [
				"Photo IDs",
				"SSNs/ITIN letters",
				"income forms",
				"dependent proof"
			],
			"notes": "Bring photo ID, SSNs, W-2s, 1099s, last year's return, and bank account for direct deposit.",
			"logoUrl": "https://www.irs.gov/favicon.ico",
			"faviconUrl": "https://www.irs.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "vita"
		},
		{
			"name": "NeedHelpPayingBills.com (independent directory)",
			"directoryCategory": "Directories / Navigators",
			"agency": "Independent consumer-aid website",
			"programType": "Private directory (not a payer)",
			"description": "Long-running index of charities and government programs by bill type and state. Useful research starting point; always verify the underlying agency.",
			"receive": "Lists and explainers; no money from the site itself.",
			"eligibility": "N/A.",
			"incomeGuideline": "N/A.",
			"available": "U.S.",
			"howToApply": "Browse by state or need.",
			"website": "https://www.needhelppayingbills.com",
			"applyUrl": "https://www.needhelppayingbills.com",
			"phone": "N/A — use listed agency phones",
			"timeline": "Immediate reading.",
			"cost": "Free to use.",
			"documents": ["None"],
			"notes": "Not a government site. Cross-check any phone number or application link on an official .gov or known nonprofit domain before sharing personal data.",
			"logoUrl": "https://www.needhelppayingbills.com/favicon.ico",
			"faviconUrl": "https://www.needhelppayingbills.com/favicon.ico",
			"asOf": "September 2026",
			"id": "needhelppayingbills"
		},
		{
			"name": "No national 'free gift card' entitlement program",
			"directoryCategory": "Other goods",
			"agency": "Various local churches, United Ways, disaster agencies, schools",
			"programType": "Local / situational",
			"description": "There is no standing federal program that mails grocery or Visa gift cards to anyone who applies online. Gift cards appear in disaster relief, foster-youth programs, domestic-violence programs, school family-resource centers, and holiday giving trees.",
			"receive": "Occasional $25–$100 cards when a local program is funded.",
			"eligibility": "Set by the giving organization. Usually an existing client or a referred family in a documented crisis.",
			"incomeGuideline": "Need-based.",
			"available": "Local only.",
			"howToApply": "Ask 211, a school family-resource liaison, your CAA, or a church benevolence office. Do not fill out random 'free Walmart card' forms online.",
			"website": "https://www.211.org",
			"applyUrl": "https://www.211.org",
			"phone": "211",
			"timeline": "Same week when a local fund exists.",
			"cost": "Free. Anyone asking you to pay or to 'verify' with a gift card is a scammer.",
			"documents": ["Local program rules"],
			"notes": "Treat every social-media 'government gift card' ad as a scam unless it originates from a known local agency you can call back on a published number.",
			"logoUrl": "https://www.211.org/favicon.ico",
			"faviconUrl": "https://www.211.org/favicon.ico",
			"asOf": "September 2026",
			"id": "gift-card-myth"
		},
		{
			"name": "No national 'free house' giveaway",
			"directoryCategory": "Housing",
			"agency": "N/A — reality check",
			"programType": "Reality check",
			"description": "The U.S. does not give free deeded houses to the general public. Ads promising HUD free houses, $1 homes with no strings, or 'government land for anyone' are almost always scams or extreme local edge cases (blight auctions that still need rehab money and taxes).",
			"receive": "Real options are rental subsidies (Section 8), public housing, Habitat sweat-equity mortgages, USDA rural loans, and foreclosure/rehab programs—not free title.",
			"eligibility": "See housing rows above.",
			"incomeGuideline": "See housing rows.",
			"available": "N/A",
			"howToApply": "Use HUD PHA contacts, Habitat, USDA RD, and 211. Ignore paid 'HUD list' sites.",
			"website": "https://www.hud.gov/helping-americans/",
			"applyUrl": "https://www.hud.gov/program_offices/public_indian_housing/pha/contacts",
			"phone": "HUD 1-800-955-2232",
			"timeline": "Years for deeply subsidized housing in high-cost areas such as Southern California.",
			"cost": "Legitimate housing programs never charge an application fee to get on a PHA list.",
			"documents": ["N/A"],
			"notes": "$1 blight properties still require the ability to finance repairs, pay taxes, and often live in the home for years. Budget accordingly.",
			"logoUrl": "https://www.hud.gov/favicon.ico",
			"faviconUrl": "https://www.hud.gov/favicon.ico",
			"asOf": "September 2026",
			"id": "free-house-myth"
		}
	],
	californiaQuickStart: [
		{
			"need": "Food + cash + Medi-Cal in one application",
			"where": "BenefitsCal (CalFresh, CalWORKs, Medi-Cal)",
			"link": "https://www.benefitscal.com",
			"phone": "CalFresh 1-877-847-3663"
		},
		{
			"need": "In-person county welfare office",
			"where": "San Bernardino County Transitional Assistance Department",
			"link": "https://wp.sbcounty.gov/tad/",
			"phone": "211 first, then TAD"
		},
		{
			"need": "Food pantry today",
			"where": "Feeding America finder or 211",
			"link": "https://www.feedingamerica.org/find-your-local-foodbank",
			"phone": "211"
		},
		{
			"need": "WIC",
			"where": "Local WIC clinic via USDA locator",
			"link": "https://www.fns.usda.gov/wic/apply",
			"phone": "1-800-311-2229"
		},
		{
			"need": "Energy bill / shutoff",
			"where": "LIHEAP via Community Action + CARE/FERA at SCE and SoCalGas",
			"link": "https://www.usa.gov/help-with-energy-bills",
			"phone": "1-866-674-6327"
		},
		{
			"need": "SCE CARE/FERA",
			"where": "Southern California Edison",
			"link": "https://www.sce.com/residential/assistance/care-fera",
			"phone": "SCE CARE line on your bill"
		},
		{
			"need": "SoCalGas CARE",
			"where": "Southern California Gas Company",
			"link": "https://www.socalgas.com/save-money/assistance-programs/care",
			"phone": "SoCalGas CARE line on your bill"
		},
		{
			"need": "Free / cheap phone",
			"where": "California LifeLine",
			"link": "https://www.californialifeline.com",
			"phone": "1-877-858-7463"
		},
		{
			"need": "Federal Lifeline backup",
			"where": "USAC National Verifier",
			"link": "https://www.lifelinesupport.org",
			"phone": "1-800-234-9473"
		},
		{
			"need": "Section 8 / public housing",
			"where": "Housing Authority of the County of San Bernardino",
			"link": "https://hacsb.com",
			"phone": "HACSB main line on site"
		},
		{
			"need": "Homeless / DV housing",
			"where": "211 coordinated entry; DV hotline if fleeing abuse",
			"link": "https://www.211.org",
			"phone": "211 / 1-800-799-7233"
		},
		{
			"need": "Habitat homeownership",
			"where": "Local Habitat affiliate (Inland Valley / related)",
			"link": "https://www.habitat.org/housing-help/apply",
			"phone": "1-800-422-4828"
		},
		{
			"need": "SSI / SSDI",
			"where": "Social Security Administration",
			"link": "https://www.ssa.gov/apply",
			"phone": "1-800-772-1213"
		},
		{
			"need": "EITC + CalEITC",
			"where": "VITA site or MyFreeTaxes, then file",
			"link": "https://irs.treasury.gov/freetaxprep/",
			"phone": "1-800-906-9887"
		},
		{
			"need": "Glasses",
			"where": "New Eyes + local Lions club",
			"link": "https://new-eyes.org/application",
			"phone": "Lions club locator"
		},
		{
			"need": "Everything else nearby",
			"where": "211 Inland SoCal / findhelp.org",
			"link": "https://www.211.org",
			"phone": "211"
		}
	],
	scamRules: [
		{
			"rule": "No fees",
			"details": "Real SNAP, Medicaid, LIHEAP, Section 8, SSI, Lifeline, and charity emergency aid do not charge an application fee. Exception: New Eyes currently lists a small non-refundable admin fee on its own site."
		},
		{
			"rule": "No gift-card payment",
			"details": "No government agency and no reputable charity will ask you to pay an unlock fee, insurance hold, or shipping with a Target, Walmart, Apple, or crypto card."
		},
		{
			"rule": "Check the domain",
			"details": "Federal sites end in .gov. State sites are usually .gov too. Charity Cars should be freecharitycars.org. Look-alike domains are a classic trick."
		},
		{
			"rule": "No social-media DMs",
			"details": "HUD, SSA, USDA, and FCC will not message you on Facebook, Instagram, WhatsApp, or Telegram to release a grant."
		},
		{
			"rule": "One household, one Lifeline",
			"details": "Anyone promising multiple free phones for one address is either violating program rules or scamming you."
		},
		{
			"rule": "PHA lists are free",
			"details": "Paid Section 8 application services and $1 HUD home lists sold online are unnecessary. Use hud.gov."
		},
		{
			"rule": "If it is urgent, go in person",
			"details": "A county welfare office, Community Action Agency, or pantry you can walk into is safer than a form you found in an ad."
		},
		{
			"rule": "Report it",
			"details": "Forward government-impersonation scams to reportfraud.ftc.gov and to the SSA fraud hotline 1-800-269-0271."
		}
	],
	doors: [
		{
			"id": "benefits-gov",
			"label": "Benefits.gov Finder",
			"detail": "Federal screening for SNAP, Medicaid, LIHEAP, and more.",
			"href": "https://www.benefits.gov/benefit-finder"
		},
		{
			"id": "uw211",
			"label": "Dial 211",
			"detail": "Live local referrals, including pantries too small for national lists.",
			"href": "https://www.211.org",
			"phone": "211"
		},
		{
			"id": "benefitscal",
			"label": "BenefitsCal",
			"detail": "California combined application for CalFresh, Medi-Cal, and CalWORKs.",
			"href": "https://www.benefitscal.com",
			"state": "CA"
		}
	]
};
/** 2025 HHS poverty guidelines, 48 contiguous states. */
var BASE = 15650;
var PER = 5500;
function federalPovertyLevel(householdSize) {
	return BASE + PER * (Math.max(1, Math.round(householdSize)) - 1);
}
function percentOfFpl(annualIncome, size) {
	const fpl = federalPovertyLevel(size);
	if (fpl <= 0) return 0;
	return annualIncome / fpl * 100;
}
function snapMaxAllotment(size) {
	const table = [
		0,
		292,
		536,
		768,
		975,
		1158,
		1390,
		1536,
		1756
	];
	const n = Math.max(1, Math.round(size));
	if (n < table.length) return table[n];
	return 1756 + 220 * (n - 8);
}
var CAT_MAP = {
	Food: "nutrition",
	"Cash / Income": "cash",
	"Tax credits": "tax",
	"Bills / Utilities": "energy",
	"Phone / Internet": "phone",
	Housing: "housing",
	"Vehicles / Transportation": "transport",
	Clothing: "goods",
	"Vision / Glasses": "vision",
	"Health coverage": "health",
	"Directories / Navigators": "navigator",
	"Other goods": "goods"
};
function snapAward$1(ctx) {
	const max = snapMaxAllotment(ctx.size);
	const contribution = Math.round(Math.max(0, ctx.monthlyIncome - ctx.monthlyRent) * .15);
	return Math.max(0, Math.min(max, max - contribution));
}
var ENRICH = {
	calfresh: {
		shortName: "SNAP",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 200
		}, {
			type: "requires_verify",
			badge: "income"
		}],
		award: snapAward$1,
		image: "/images/snap-groceries.jpg",
		bundle: "table"
	},
	wic: {
		shortName: "WIC",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 185
		}, {
			type: "pregnant_or_young_child",
			age: 5
		}],
		award: (ctx) => {
			return (ctx.children.filter((c) => c.age < 5).length + (ctx.members.some((m) => m.pregnant) ? 1 : 0)) * 60;
		},
		image: "/images/wic-produce.jpg",
		tint: "lilac",
		bundle: "table"
	},
	"school-meals": {
		shortName: "Meals",
		valueKind: "monthly",
		rules: [{
			type: "min_children",
			count: 1,
			ageMax: 18
		}],
		award: (ctx) => ctx.children.filter((c) => c.age >= 5 && c.age <= 18).length * 148,
		bundle: "table"
	},
	"food-bank": {
		shortName: "Pantry",
		valueKind: "monthly",
		rules: [],
		award: (ctx) => 48 * Math.min(ctx.size, 5),
		image: "/images/snap-groceries.jpg",
		bundle: "table"
	},
	csfp: {
		shortName: "CSFP",
		valueKind: "monthly",
		rules: [{
			type: "min_age",
			age: 60
		}, {
			type: "max_fpl",
			percent: 130
		}],
		award: () => 50,
		image: "/images/food-box.jpg"
	},
	"meals-on-wheels": {
		shortName: "Meals",
		valueKind: "monthly",
		rules: [{
			type: "min_age",
			age: 60
		}],
		award: () => 180,
		image: "/images/food-box.jpg"
	},
	fdpir: {
		shortName: "FDPIR",
		valueKind: "monthly",
		rules: [{ type: "tribal" }, {
			type: "max_fpl",
			percent: 130
		}],
		award: snapAward$1,
		image: "/images/food-box.jpg"
	},
	calworks: {
		shortName: "TANF",
		valueKind: "monthly",
		rules: [
			{
				type: "max_fpl",
				percent: 130
			},
			{
				type: "min_children",
				count: 1,
				ageMax: 18
			},
			{
				type: "requires_verify",
				badge: "income"
			}
		],
		award: (ctx) => {
			const base = 400 + 175 * Math.max(0, ctx.size - 1);
			const taper = Math.round(ctx.monthlyIncome * .5);
			return Math.max(0, base - taper);
		},
		deadlineDays: 14
	},
	ssi: {
		shortName: "SSI",
		valueKind: "monthly",
		rules: [{ type: "has_disabled" }],
		award: () => 967
	},
	ssdi: {
		shortName: "SSDI",
		valueKind: "monthly",
		rules: [{ type: "has_disabled" }],
		award: () => 0
	},
	eitc: {
		shortName: "EITC",
		valueKind: "annual",
		rules: [{ type: "working_or_student" }, {
			type: "max_fpl",
			percent: 250
		}],
		award: (ctx) => {
			const kids = ctx.children.length;
			return Math.round((kids >= 2 ? 7830 : kids === 1 ? 4213 : 632) / 12);
		}
	},
	ctc: {
		shortName: "CTC",
		valueKind: "annual",
		rules: [{ type: "working_or_student" }, {
			type: "min_children",
			count: 1,
			ageMax: 17
		}],
		award: (ctx) => Math.round(2e3 * ctx.children.filter((c) => c.age < 17).length / 12)
	},
	"general-relief": {
		shortName: "GA",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 80
		}],
		award: () => 300
	},
	liheap: {
		shortName: "LIHEAP",
		valueKind: "seasonal",
		rules: [{
			type: "max_fpl",
			percent: 150
		}, {
			type: "requires_verify",
			badge: "residency"
		}],
		award: () => 75,
		image: "/images/liheap-hero.jpg",
		urgent: true,
		deadlineDays: 12,
		bundle: "hearth"
	},
	weatherize: {
		shortName: "WAP",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}, {
			type: "requires_verify",
			badge: "residency"
		}],
		award: () => 200,
		image: "/images/weatherize.jpg",
		tint: "peach",
		deadlineDays: 24,
		bundle: "hearth",
		pills: [{
			label: "In-kind upgrades",
			tone: "warn"
		}, {
			label: "Owner or renter approval",
			tone: "muted"
		}]
	},
	care: {
		shortName: "CARE",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 250
		}, {
			type: "state",
			states: ["CA"]
		}],
		award: () => 38,
		bundle: "hearth"
	},
	"salvation-army": {
		shortName: "SA",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}],
		award: () => 50,
		urgent: true,
		deadlineDays: 7
	},
	"catholic-charities": {
		shortName: "CC",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}],
		award: () => 50
	},
	svdp: {
		shortName: "SVdP",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}],
		award: () => 40
	},
	csbg: {
		shortName: "CAA",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}],
		award: () => 60
	},
	"fema-efsp": {
		shortName: "EFSP",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}],
		award: () => 40
	},
	lifeline: {
		shortName: "Line",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 150
		}],
		award: () => 9,
		image: "/images/connectivity.jpg",
		tint: "cream"
	},
	"ca-lifeline": {
		shortName: "CA Line",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 150
		}, {
			type: "state",
			states: ["CA"]
		}],
		award: () => 20,
		image: "/images/connectivity.jpg"
	},
	section8: {
		shortName: "HCV",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 80
		}, { type: "renting" }],
		award: (ctx) => Math.round(ctx.monthlyRent * .7)
	},
	"public-housing": {
		shortName: "PHA",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 80
		}],
		award: (ctx) => Math.round(ctx.monthlyRent * .5)
	},
	"hud-vash": {
		shortName: "VASH",
		valueKind: "monthly",
		rules: [{ type: "has_veteran" }, {
			type: "max_fpl",
			percent: 80
		}],
		award: (ctx) => Math.round(ctx.monthlyRent * .7)
	},
	"continuum-of-care": {
		shortName: "CoC",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 150
		}],
		award: () => 0
	},
	"usda-rural": {
		shortName: "USDA",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 80
		}],
		award: () => 0
	},
	habitat: {
		shortName: "Habitat",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 80
		}, { type: "working_or_student" }],
		award: () => 0
	},
	"free-house-myth": {
		shortName: "Myth",
		listing: "advisory",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	"charity-cars": {
		shortName: "Cars",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}, { type: "working_or_student" }],
		award: () => 0
	},
	"vehicles-for-change": {
		shortName: "VFC",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}, { type: "working_or_student" }],
		award: () => 0
	},
	"nclc-cars": {
		shortName: "NCLC",
		listing: "directory",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	"va-auto": {
		shortName: "VA auto",
		valueKind: "one-time",
		rules: [{ type: "has_veteran" }],
		award: () => 0
	},
	"ride-united": {
		shortName: "Rides",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	"dress-for-success": {
		shortName: "DFS",
		valueKind: "one-time",
		rules: [{ type: "working_or_student" }],
		award: () => 0,
		tint: "lilac"
	},
	"career-gear": {
		shortName: "Gear",
		valueKind: "one-time",
		rules: [{ type: "working_or_student" }],
		award: () => 0
	},
	"clothing-closets": {
		shortName: "Closet",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	"new-eyes": {
		shortName: "Eyes",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 250
		}],
		award: () => 0,
		pills: [{
			label: "One pair of glasses",
			tone: "ok"
		}, {
			label: "Small admin fee",
			tone: "warn"
		}]
	},
	lions: {
		shortName: "Lions",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}],
		award: () => 0
	},
	"vsp-eyes": {
		shortName: "VSP",
		valueKind: "one-time",
		rules: [{
			type: "max_fpl",
			percent: 200
		}],
		award: () => 0
	},
	"prevent-blindness": {
		shortName: "NEI",
		listing: "directory",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	"medi-cal": {
		shortName: "Medi-Cal",
		valueKind: "monthly",
		rules: [{
			type: "max_fpl",
			percent: 160
		}, {
			type: "requires_verify",
			badge: "residency"
		}],
		award: (ctx) => ctx.size * 210,
		image: "/images/health.jpg",
		bundle: "kin"
	},
	chip: {
		shortName: "CHIP",
		valueKind: "monthly",
		rules: [{
			type: "min_children",
			count: 1,
			ageMax: 19
		}, {
			type: "max_fpl",
			percent: 250
		}],
		award: (ctx) => ctx.children.filter((c) => c.age < 19).length * 180,
		image: "/images/health.jpg"
	},
	"benefits-gov": {
		shortName: "Finder",
		listing: "directory",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	uw211: {
		shortName: "211",
		listing: "directory",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	findhelp: {
		shortName: "findhelp",
		listing: "directory",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	benefitscal: {
		shortName: "BenefitsCal",
		listing: "directory",
		valueKind: "one-time",
		rules: [{
			type: "state",
			states: ["CA"]
		}],
		award: () => 0
	},
	vita: {
		shortName: "VITA",
		valueKind: "annual",
		rules: [{ type: "working_or_student" }, {
			type: "max_fpl",
			percent: 250
		}],
		award: () => 0
	},
	needhelppayingbills: {
		shortName: "NHPB",
		listing: "directory",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	},
	"gift-card-myth": {
		shortName: "Myth",
		listing: "advisory",
		valueKind: "one-time",
		rules: [],
		award: () => 0
	}
};
function inferSource(programType) {
	const t = programType.toLowerCase();
	if (t.includes("reality") || t.includes("nonprofit") || t.includes("private") || t.includes("community")) return "nonprofit";
	if (t.includes("state") && !t.includes("federal")) return "state";
	if (t.includes("county")) return "state";
	return "federal";
}
function inferListing(row, enrich) {
	if (enrich?.listing) return enrich.listing;
	if (row.directoryCategory === "Directories / Navigators") return "directory";
	if (row.programType.toLowerCase().includes("reality")) return "advisory";
	return "benefit";
}
function firstSentence(text) {
	const clean = text.replace(/\s+/g, " ").trim();
	const cut = clean.split(/(?<=\.)\s/)[0] ?? clean;
	return cut.length > 180 ? `${cut.slice(0, 177)}…` : cut;
}
var CATEGORY_IMAGES = {
	nutrition: "/images/snap-groceries.jpg",
	cash: "/images/cash-aid.jpg",
	tax: "/images/tax-credit.jpg",
	energy: "/images/liheap-hero.jpg",
	phone: "/images/connectivity.jpg",
	housing: "/images/housing.jpg",
	transport: "/images/transport.jpg",
	goods: "/images/goods.jpg",
	vision: "/images/vision.jpg",
	health: "/images/health.jpg",
	navigator: "/images/help-line.jpg"
};
function buildProgram(row) {
	const enrich = ENRICH[row.id];
	const category = CAT_MAP[row.directoryCategory] ?? "navigator";
	const listing = inferListing(row, enrich);
	return {
		id: row.id,
		name: row.name,
		shortName: enrich?.shortName ?? row.name,
		agency: row.agency.split(";")[0].trim(),
		source: inferSource(row.programType),
		category,
		listing,
		valueKind: enrich?.valueKind ?? "one-time",
		renewal: row.timeline.split(".")[0] ?? row.timeline,
		deadlineDays: enrich?.deadlineDays,
		urgent: enrich?.urgent,
		summary: firstSentence(row.receive || row.description),
		plain: row.description,
		documents: row.documents,
		rules: enrich?.rules ?? [],
		bundle: enrich?.bundle,
		image: enrich?.image ?? CATEGORY_IMAGES[category],
		tint: enrich?.tint,
		pills: enrich?.pills,
		footNote: listing === "advisory" ? "Reality check" : listing === "directory" ? "Directory" : row.cost,
		website: row.website,
		applyUrl: row.applyUrl,
		phone: row.phone,
		timeline: row.timeline,
		cost: row.cost,
		receive: row.receive,
		incomeGuideline: row.incomeGuideline,
		available: row.available,
		howToApply: row.howToApply,
		notes: row.notes,
		asOf: row.asOf,
		directoryCategory: row.directoryCategory,
		award: enrich?.award ?? (() => 0)
	};
}
var PROGRAMS = directory_default.programs.map(buildProgram);
var BUNDLES = [
	{
		id: "table",
		name: "Grocery bundle",
		tag: "Nutrition",
		programIds: [
			"calfresh",
			"wic",
			"school-meals",
			"food-bank"
		],
		blurb: "One income packet covers groceries, WIC, school meals, and the pantry box."
	},
	{
		id: "hearth",
		name: "Winter energy bundle",
		tag: "Energy",
		programIds: [
			"liheap",
			"care",
			"weatherize",
			"salvation-army"
		],
		blurb: "Shared utility bill and ID unlocks the winter credit, the ongoing discount, and shutoff help."
	},
	{
		id: "kin",
		name: "Coverage bundle",
		tag: "Health",
		programIds: [
			"medi-cal",
			"chip",
			"wic",
			"calworks"
		],
		blurb: "Kids' records and income proof open Medi-Cal, CHIP, WIC, and cash aid."
	}
];
var CATEGORY_META = {
	nutrition: {
		label: "Food",
		hint: "Groceries, WIC, pantry",
		bar: "bg-ok",
		tone: "ok"
	},
	cash: {
		label: "Cash",
		hint: "TANF, SSI, county relief",
		bar: "bg-ok",
		tone: "ok"
	},
	tax: {
		label: "Tax credits",
		hint: "EITC, CTC, VITA",
		bar: "bg-warn",
		tone: "warn"
	},
	energy: {
		label: "Bills",
		hint: "LIHEAP, weatherize, CARE",
		bar: "bg-warn",
		tone: "warn"
	},
	phone: {
		label: "Phone",
		hint: "Lifeline and CA LifeLine",
		bar: "bg-warn",
		tone: "warn"
	},
	housing: {
		label: "Housing",
		hint: "Section 8, PHA, Habitat",
		bar: "bg-subtle",
		tone: "muted"
	},
	transport: {
		label: "Vehicles",
		hint: "Cars, repairs, rides",
		bar: "bg-subtle",
		tone: "muted"
	},
	goods: {
		label: "Clothes & goods",
		hint: "Closets and workwear",
		bar: "bg-lilac-fg",
		tone: "lilac"
	},
	vision: {
		label: "Vision",
		hint: "Glasses and eye exams",
		bar: "bg-lilac-fg",
		tone: "lilac"
	},
	health: {
		label: "Health",
		hint: "Medicaid and CHIP",
		bar: "bg-ok",
		tone: "ok"
	},
	navigator: {
		label: "Directories",
		hint: "211, Benefits.gov, findhelp",
		bar: "bg-subtle",
		tone: "muted"
	}
};
var FILTERS = [
	{
		id: "all",
		label: "All"
	},
	{
		id: "nutrition",
		label: "Food"
	},
	{
		id: "cash",
		label: "Cash"
	},
	{
		id: "tax",
		label: "Tax"
	},
	{
		id: "energy",
		label: "Bills"
	},
	{
		id: "phone",
		label: "Phone"
	},
	{
		id: "housing",
		label: "Housing"
	},
	{
		id: "transport",
		label: "Rides"
	},
	{
		id: "goods",
		label: "Goods"
	},
	{
		id: "vision",
		label: "Vision"
	},
	{
		id: "health",
		label: "Health"
	},
	{
		id: "navigator",
		label: "Help"
	}
];
directory_default.scamRules;
directory_default.californiaQuickStart;
var START_DOORS = directory_default.doors;
function bundleById(id) {
	return BUNDLES.find((b) => b.id === id);
}
var AWARD_FORMULAS = [
	"snap",
	"wic",
	"meals",
	"pantry",
	"tanf",
	"eitc",
	"ctc",
	"medi-cal",
	"chip",
	"rent70",
	"rent50",
	"flat",
	"zero"
];
function snapAward(ctx) {
	const max = snapMaxAllotment(ctx.size);
	const contribution = Math.round(Math.max(0, ctx.monthlyIncome - ctx.monthlyRent) * .15);
	return Math.max(0, Math.min(max, max - contribution));
}
function awardFn(formula, amount = 0) {
	switch (formula) {
		case "snap": return snapAward;
		case "wic": return (ctx) => {
			return (ctx.children.filter((c) => c.age < 5).length + (ctx.members.some((m) => m.pregnant) ? 1 : 0)) * 60;
		};
		case "meals": return (ctx) => ctx.children.filter((c) => c.age >= 5 && c.age <= 18).length * 148;
		case "pantry": return (ctx) => 48 * Math.min(ctx.size, 5);
		case "tanf": return (ctx) => {
			const base = 400 + 175 * Math.max(0, ctx.size - 1);
			const taper = Math.round(ctx.monthlyIncome * .5);
			return Math.max(0, base - taper);
		};
		case "eitc": return (ctx) => {
			const kids = ctx.children.length;
			return Math.round((kids >= 2 ? 7830 : kids === 1 ? 4213 : 632) / 12);
		};
		case "ctc": return (ctx) => Math.round(2e3 * ctx.children.filter((c) => c.age < 17).length / 12);
		case "medi-cal": return (ctx) => ctx.size * 210;
		case "chip": return (ctx) => ctx.children.filter((c) => c.age < 19).length * 180;
		case "rent70": return (ctx) => Math.round(ctx.monthlyRent * .7);
		case "rent50": return (ctx) => Math.round(ctx.monthlyRent * .5);
		case "flat": return () => Math.max(0, amount);
		case "zero": return () => 0;
	}
}
var FORMULA_BY_ID = {
	calfresh: {
		formula: "snap",
		amount: 0
	},
	wic: {
		formula: "wic",
		amount: 0
	},
	"school-meals": {
		formula: "meals",
		amount: 0
	},
	"food-bank": {
		formula: "pantry",
		amount: 0
	},
	csfp: {
		formula: "flat",
		amount: 50
	},
	"meals-on-wheels": {
		formula: "flat",
		amount: 180
	},
	fdpir: {
		formula: "snap",
		amount: 0
	},
	calworks: {
		formula: "tanf",
		amount: 0
	},
	ssi: {
		formula: "flat",
		amount: 967
	},
	ssdi: {
		formula: "zero",
		amount: 0
	},
	eitc: {
		formula: "eitc",
		amount: 0
	},
	ctc: {
		formula: "ctc",
		amount: 0
	},
	"general-relief": {
		formula: "flat",
		amount: 300
	},
	liheap: {
		formula: "flat",
		amount: 75
	},
	weatherize: {
		formula: "flat",
		amount: 200
	},
	care: {
		formula: "flat",
		amount: 38
	},
	"salvation-army": {
		formula: "flat",
		amount: 50
	},
	"catholic-charities": {
		formula: "flat",
		amount: 50
	},
	svdp: {
		formula: "flat",
		amount: 40
	},
	csbg: {
		formula: "flat",
		amount: 60
	},
	"fema-efsp": {
		formula: "flat",
		amount: 40
	},
	lifeline: {
		formula: "flat",
		amount: 9
	},
	"ca-lifeline": {
		formula: "flat",
		amount: 20
	},
	section8: {
		formula: "rent70",
		amount: 0
	},
	"public-housing": {
		formula: "rent50",
		amount: 0
	},
	"hud-vash": {
		formula: "rent70",
		amount: 0
	},
	"medi-cal": {
		formula: "medi-cal",
		amount: 0
	},
	chip: {
		formula: "chip",
		amount: 0
	}
};
function formulaForId(id, fallbackAmount = 0) {
	return FORMULA_BY_ID[id] ?? {
		formula: fallbackAmount > 0 ? "flat" : "zero",
		amount: fallbackAmount
	};
}
function parseAwardFormula(raw) {
	const key = raw.trim().toLowerCase();
	return AWARD_FORMULAS.includes(key) ? key : null;
}
var CAT_FROM_LABEL = {
	food: "nutrition",
	nutrition: "nutrition",
	cash: "cash",
	tax: "tax",
	"tax credits": "tax",
	bills: "energy",
	energy: "energy",
	phone: "phone",
	housing: "housing",
	rides: "transport",
	vehicles: "transport",
	transport: "transport",
	goods: "goods",
	vision: "vision",
	health: "health",
	help: "navigator",
	directories: "navigator",
	navigator: "navigator"
};
function parseCsv(text) {
	const rows = [];
	let row = [];
	let cell = "";
	let i = 0;
	let quoted = false;
	const src = text.replace(/^\uFEFF/, "");
	while (i < src.length) {
		const ch = src[i];
		if (quoted) {
			if (ch === "\"") {
				if (src[i + 1] === "\"") {
					cell += "\"";
					i += 2;
					continue;
				}
				quoted = false;
				i += 1;
				continue;
			}
			cell += ch;
			i += 1;
			continue;
		}
		if (ch === "\"") {
			quoted = true;
			i += 1;
			continue;
		}
		if (ch === ",") {
			row.push(cell);
			cell = "";
			i += 1;
			continue;
		}
		if (ch === "\n" || ch === "\r") {
			if (ch === "\r" && src[i + 1] === "\n") i += 1;
			row.push(cell);
			if (row.some((c) => c.trim() !== "")) rows.push(row);
			row = [];
			cell = "";
			i += 1;
			continue;
		}
		cell += ch;
		i += 1;
	}
	row.push(cell);
	if (row.some((c) => c.trim() !== "")) rows.push(row);
	return rows;
}
function asBool(raw) {
	return /^(true|yes|1|y|x)$/i.test((raw ?? "").trim());
}
function asNum(raw) {
	const t = (raw ?? "").trim();
	if (!t) return void 0;
	const n = Number(t);
	return Number.isFinite(n) ? n : void 0;
}
function normalizeHeader(h) {
	return h.trim().toLowerCase().replace(/\s+/g, "_");
}
function parseCategory(raw) {
	return CAT_FROM_LABEL[raw.trim().toLowerCase()] ?? "navigator";
}
function parseListing(raw) {
	const key = raw.trim().toLowerCase();
	if (key === "directory" || key === "directories") return "directory";
	if (key === "advisory" || key === "myth") return "advisory";
	return "benefit";
}
function parseValueKind(raw) {
	const key = raw.trim().toLowerCase();
	if (key === "seasonal" || key === "annual" || key === "one-time" || key === "monthly") return key;
	return "one-time";
}
function parseSource(raw) {
	const key = raw.trim().toLowerCase();
	if (key === "state" || key === "nonprofit") return key;
	return "federal";
}
function rulesFromRow(row) {
	const rules = [];
	const maxFpl = asNum(row.max_fpl);
	if (maxFpl != null) rules.push({
		type: "max_fpl",
		percent: maxFpl
	});
	const childUnder = asNum(row.child_under);
	if (childUnder != null) rules.push({
		type: "child_under",
		age: childUnder
	});
	const minChildren = asNum(row.min_children);
	if (minChildren != null) rules.push({
		type: "min_children",
		count: minChildren,
		ageMax: asNum(row.min_children_age_max)
	});
	const minAge = asNum(row.min_age);
	if (minAge != null) rules.push({
		type: "min_age",
		age: minAge
	});
	if (asBool(row.needs_veteran)) rules.push({ type: "has_veteran" });
	if (asBool(row.needs_disabled)) rules.push({ type: "has_disabled" });
	const preg = asNum(row.needs_pregnant_or_child);
	if (preg != null) rules.push({
		type: "pregnant_or_young_child",
		age: preg
	});
	else if (asBool(row.needs_pregnant_or_child)) rules.push({
		type: "pregnant_or_young_child",
		age: 5
	});
	if (asBool(row.needs_renting)) rules.push({ type: "renting" });
	if (asBool(row.needs_working)) rules.push({ type: "working_or_student" });
	if (asBool(row.tribal)) rules.push({ type: "tribal" });
	const states = (row.states ?? "").split(/[;|,]/).map((s) => s.trim().toUpperCase()).filter(Boolean);
	if (states.length) rules.push({
		type: "state",
		states
	});
	const verify = (row.verify ?? "").split(/[;|,]/).map((s) => s.trim().toLowerCase()).filter(Boolean);
	for (const badge of verify) if (badge === "identity" || badge === "income" || badge === "residency" || badge === "household") rules.push({
		type: "requires_verify",
		badge
	});
	return rules;
}
function formulaFromRow(id, row) {
	const parsed = parseAwardFormula(row.award_formula ?? "");
	const amount = asNum(row.award_amount) ?? 0;
	if (parsed) return {
		formula: parsed,
		amount
	};
	return formulaForId(id, amount);
}
function parseSheetCsv(csv) {
	const table = parseCsv(csv);
	const headerRow = table[0];
	if (!headerRow) return [];
	const headers = headerRow.map(normalizeHeader);
	const programs = [];
	for (const cells of table.slice(1)) {
		const row = {};
		headers.forEach((h, i) => {
			row[h] = (cells[i] ?? "").trim();
		});
		if (row.active && /^(false|no|0)$/i.test(row.active)) continue;
		const id = (row.id || row.short_name || row.name || "").toLowerCase().replace(/\s+/g, "-");
		if (!id) continue;
		const category = parseCategory(row.category || "help");
		const listing = parseListing(row.listing || "benefit");
		const { formula, amount } = formulaFromRow(id, row);
		const documents = (row.documents ?? "").split(/[;|]/).map((d) => d.trim()).filter(Boolean);
		programs.push({
			id,
			name: row.name || row.short_name || id,
			shortName: row.short_name || row.name || id,
			agency: row.agency || "Agency",
			source: parseSource(row.source || ""),
			category,
			listing,
			valueKind: parseValueKind(row.value_kind || ""),
			renewal: (row.timeline || "").split(".")[0] || row.timeline || "",
			deadlineDays: asNum(row.deadline_days),
			urgent: asBool(row.urgent),
			summary: row.summary || row.receive || row.name || "",
			plain: row.plain || row.receive || row.summary || "",
			documents,
			rules: rulesFromRow(row),
			image: row.image || CATEGORY_IMAGES[category],
			website: row.website,
			applyUrl: row.apply_url,
			phone: row.phone,
			timeline: row.timeline,
			cost: row.cost,
			receive: row.receive,
			incomeGuideline: row.income_guideline,
			howToApply: row.how_to_apply,
			notes: row.notes,
			directoryCategory: CATEGORY_META[category].label,
			award: awardFn(formula, amount)
		});
	}
	return programs;
}
function toCsvExportUrl(input) {
	const trimmed = input.trim();
	if (!trimmed) return null;
	if (!/^https:\/\/docs\.google\.com\/spreadsheets\//i.test(trimmed)) return null;
	if (/\/export\?/i.test(trimmed) || /[?&]output=csv/i.test(trimmed) || /\/pub(?:html)?/i.test(trimmed)) {
		if (/\/pubhtml/i.test(trimmed)) return trimmed.replace(/\/pubhtml.*/i, "/pub?output=csv");
		return trimmed;
	}
	const published = trimmed.match(/\/spreadsheets\/d\/e\/([a-zA-Z0-9-_]+)/);
	if (published) return `https://docs.google.com/spreadsheets/d/e/${published[1]}/pub?output=csv`;
	const id = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
	if (!id || id === "e") return null;
	return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${trimmed.match(/[?#&]gid=(\d+)/)?.[1] ?? "0"}`;
}
//#endregion
export { FILTERS as a, bundleById as c, percentOfFpl as d, toCsvExportUrl as f, DRIVE_CATALOG as i, federalPovertyLevel as l, CATEGORY_IMAGES as n, PROGRAMS as o, CATEGORY_META as r, START_DOORS as s, CATALOG_POLL_MS as t, parseSheetCsv as u };
