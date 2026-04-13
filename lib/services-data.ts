export type ServiceSlug =
  | "ac-repair"
  | "furnace-repair"
  | "heat-pump-repair"
  | "mini-split-repair"
  | "boiler-repair"
  | "ductwork-repair"
  | "thermostat-repair"
  | "compressor-repair"
  | "blower-motor-repair"
  | "capacitor-replacement"
  | "ac-unit-replacement"
  | "furnace-replacement"
  | "heat-pump-replacement"
  | "boiler-replacement"
  | "ductwork-replacement"
  | "air-handler-replacement";

export type ServiceContent = {
  slug: ServiceSlug;
  name: string;
  navLabel: string;
  shortDescription: string;
  emergencyLine: string;
  heroPrimary: string;
  heroSecondary: string;
  processSteps: string[];
  faqs: Array<{ q: string; a: string }>;
  seo: {
    focusKeyphrase: string;
    relatedTerms: string[];
  };
};

const SERVICE_FAQS: Array<{ q: string; a: string }> = [
  {
    q: "How quickly can HVAC service be scheduled?",
    a: "Scheduling depends on weather demand and technician availability, but urgent no-heat or no-cooling calls are prioritized for same-day or next-available dispatch whenever possible. When you call, we confirm timing, gather system details, and help you prepare for the visit.",
  },
  {
    q: "Do you support homes and commercial properties?",
    a: "Yes. We support houses, condos, offices, retail units, and light commercial properties. The diagnostic workflow is adjusted to your equipment type, occupancy needs, and operating hours so repairs and recommendations are practical for your space.",
  },
  {
    q: "Can I get documentation for warranty or insurance files?",
    a: "Yes. We can provide service notes, diagnostic summaries, and parts or replacement scope details that are useful for warranty and insurance records. If you need specific documentation formatting, let us know before or during the visit.",
  },
  {
    q: "What if I am not sure whether I need repair or replacement?",
    a: "After inspection, we provide a clear recommendation based on safety, reliability, part condition, repair frequency, and expected operating cost. You will get practical options so you can choose between immediate repair and longer-term replacement with confidence.",
  },
];

export const SERVICES: Record<ServiceSlug, ServiceContent> = {
  "ac-repair": {
    slug: "ac-repair",
    name: "AC Repair",
    navLabel: "AC Repair",
    shortDescription: "Fast troubleshooting and AC repair for weak cooling, warm airflow, leaks, and frequent system shutdowns.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Emergency AC Repair",
    heroSecondary: "Restore stable cooling performance with clear diagnostics and practical next steps.",
    processSteps: [
      "System intake and symptom check",
      "Electrical and refrigerant diagnostics",
      "Targeted repairs and performance verification",
      "Final airflow and temperature confirmation",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "ac repair",
      relatedTerms: ["air conditioner repair", "central ac repair", "emergency ac service", "same day ac repair"],
    },
  },
  "furnace-repair": {
    slug: "furnace-repair",
    name: "Furnace Repair",
    navLabel: "Furnace",
    shortDescription: "Reliable furnace repair for ignition issues, short cycling, airflow loss, and uneven home heating.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Emergency Furnace Repair",
    heroSecondary: "Get heat restored safely with fast diagnostics and code-aware repair workflows.",
    processSteps: [
      "Safety and ignition sequence checks",
      "Component testing and fault isolation",
      "Repair execution and startup tuning",
      "Heat output and airflow confirmation",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "furnace repair",
      relatedTerms: ["gas furnace repair", "no heat repair", "furnace service", "heating repair"],
    },
  },
  "heat-pump-repair": {
    slug: "heat-pump-repair",
    name: "Heat Pump Repair",
    navLabel: "Heat Pump",
    shortDescription: "Heat pump repair for poor heating or cooling, icing, defrost faults, and compressor performance issues.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Heat Pump Repair Service",
    heroSecondary: "Stabilize year-round comfort with focused diagnostics and tested repairs.",
    processSteps: [
      "Mode performance inspection",
      "Defrost, airflow, and electrical testing",
      "Component repair or correction",
      "Heating and cooling cycle verification",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "heat pump repair",
      relatedTerms: ["ducted heat pump repair", "air source heat pump service", "heat pump technician", "heating and cooling repair"],
    },
  },
  "mini-split-repair": {
    slug: "mini-split-repair",
    name: "Mini-Split Repair",
    navLabel: "Mini-Split",
    shortDescription: "Mini-split repair for indoor head errors, drain issues, weak output, and communication faults.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Mini-Split Repair",
    heroSecondary: "Bring ductless systems back to efficient and consistent operation.",
    processSteps: [
      "Indoor and outdoor unit diagnostics",
      "Drain, control, and refrigerant checks",
      "Targeted repairs and reset procedures",
      "Cooling and heating mode confirmation",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "mini-split repair",
      relatedTerms: ["ductless ac repair", "ductless heat pump repair", "mini split service", "split unit repair"],
    },
  },
  "boiler-repair": {
    slug: "boiler-repair",
    name: "Boiler Repair",
    navLabel: "Boiler",
    shortDescription: "Boiler repair for pressure drops, circulation faults, pilot issues, and uneven hydronic heating.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Boiler Repair Support",
    heroSecondary: "Protect comfort and system safety with fast boiler fault isolation and repair.",
    processSteps: [
      "Pressure and control diagnostics",
      "Burner, pump, and valve checks",
      "Repair and safety verification",
      "Hydronic performance testing",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "boiler repair",
      relatedTerms: ["hydronic heating repair", "gas boiler service", "hot water boiler repair", "boiler technician"],
    },
  },
  "ductwork-repair": {
    slug: "ductwork-repair",
    name: "Ductwork Repair",
    navLabel: "Duct Repair",
    shortDescription: "Ductwork repair for air leaks, poor airflow balance, noise, and comfort gaps between rooms.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Ductwork Repair",
    heroSecondary: "Improve airflow consistency and system efficiency by correcting duct defects.",
    processSteps: [
      "Airflow and leakage assessment",
      "Duct sealing and section repair",
      "Insulation and balancing adjustments",
      "Post-repair airflow validation",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "ductwork repair",
      relatedTerms: ["air duct repair", "hvac duct repair", "duct sealing", "airflow balancing"],
    },
  },
  "thermostat-repair": {
    slug: "thermostat-repair",
    name: "Thermostat Repair",
    navLabel: "Thermostat",
    shortDescription: "Thermostat repair for sensor inaccuracies, control glitches, wiring faults, and schedule failures.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Thermostat Repair",
    heroSecondary: "Get reliable control back for both heating and cooling operation.",
    processSteps: [
      "Control and wiring diagnostics",
      "Sensor and calibration checks",
      "Repair or control correction",
      "System response verification",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "thermostat repair",
      relatedTerms: ["smart thermostat repair", "hvac thermostat service", "temperature control repair", "thermostat troubleshooting"],
    },
  },
  "compressor-repair": {
    slug: "compressor-repair",
    name: "Compressor Repair",
    navLabel: "Compressor",
    shortDescription: "Compressor repair for hard starts, overheating, tripping breakers, and reduced system capacity.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Compressor Repair",
    heroSecondary: "Address core cooling or heat pump compression issues before major failure.",
    processSteps: [
      "Electrical and load diagnostics",
      "Start/run circuit analysis",
      "Compressor support repairs",
      "Operating pressure confirmation",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "compressor repair",
      relatedTerms: ["ac compressor repair", "heat pump compressor service", "compressor troubleshooting", "hvac compressor issue"],
    },
  },
  "blower-motor-repair": {
    slug: "blower-motor-repair",
    name: "Blower Motor Repair",
    navLabel: "Blower",
    shortDescription: "Blower motor repair for weak airflow, noise, intermittent operation, and startup failure.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Blower Motor Repair",
    heroSecondary: "Restore steady airflow and comfort distribution across the property.",
    processSteps: [
      "Motor and capacitor diagnostics",
      "Control board and speed testing",
      "Repair or motor correction",
      "Airflow output verification",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "blower motor repair",
      relatedTerms: ["furnace blower repair", "air handler blower repair", "hvac fan motor repair", "weak airflow fix"],
    },
  },
  "capacitor-replacement": {
    slug: "capacitor-replacement",
    name: "Capacitor Replacement",
    navLabel: "Capacitor",
    shortDescription: "Capacitor replacement for hard starts, humming outdoor units, and intermittent cooling failures.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "HVAC Capacitor Replacement",
    heroSecondary: "Replace failing start or run capacitors with properly rated components.",
    processSteps: [
      "Electrical safety and component testing",
      "Capacitance verification",
      "Rated capacitor replacement",
      "Startup and load confirmation",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "capacitor replacement",
      relatedTerms: ["ac capacitor replacement", "furnace capacitor replacement", "hvac hard start issue", "run capacitor service"],
    },
  },
  "ac-unit-replacement": {
    slug: "ac-unit-replacement",
    name: "AC Unit Replacement",
    navLabel: "AC Replace",
    shortDescription: "AC unit replacement planning and installation for aging systems with frequent or costly breakdowns.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "AC Unit Replacement",
    heroSecondary: "Upgrade to a reliable cooling setup with right-sized system recommendations.",
    processSteps: [
      "Load and sizing review",
      "Equipment and efficiency selection",
      "Removal and installation",
      "Startup commissioning and owner walkthrough",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "ac unit replacement",
      relatedTerms: ["air conditioner replacement", "central ac replacement", "new ac installation", "ac system upgrade"],
    },
  },
  "furnace-replacement": {
    slug: "furnace-replacement",
    name: "Furnace Replacement",
    navLabel: "Furnace Replace",
    shortDescription: "Furnace replacement for older or unsafe systems with declining performance and higher heating costs.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Furnace Replacement",
    heroSecondary: "Plan a confident heating upgrade with installation and commissioning support.",
    processSteps: [
      "Heating load and venting assessment",
      "Equipment and efficiency selection",
      "Old unit removal and new install",
      "Safety checks and heat verification",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "furnace replacement",
      relatedTerms: ["new furnace installation", "heating system replacement", "gas furnace replacement", "furnace upgrade"],
    },
  },
  "heat-pump-replacement": {
    slug: "heat-pump-replacement",
    name: "Heat Pump Replacement",
    navLabel: "HP Replace",
    shortDescription: "Heat pump replacement for end-of-life systems and recurring faults affecting seasonal comfort.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Heat Pump Replacement",
    heroSecondary: "Move to a newer heat pump system with better efficiency and dependability.",
    processSteps: [
      "Performance and sizing review",
      "System recommendation and scope",
      "Removal and replacement install",
      "Mode testing and commissioning",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "heat pump replacement",
      relatedTerms: ["new heat pump installation", "air source heat pump replacement", "ducted heat pump install", "heat pump upgrade"],
    },
  },
  "boiler-replacement": {
    slug: "boiler-replacement",
    name: "Boiler Replacement",
    navLabel: "Boiler Replace",
    shortDescription: "Boiler replacement for aging hydronic systems with reliability, safety, or efficiency concerns.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Boiler Replacement",
    heroSecondary: "Upgrade hydronic heating with modern boiler options and proper startup tuning.",
    processSteps: [
      "System condition and sizing review",
      "Boiler option selection",
      "Installation and piping integration",
      "Commissioning and circulation checks",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "boiler replacement",
      relatedTerms: ["new boiler installation", "hydronic boiler replacement", "heating boiler upgrade", "boiler install"],
    },
  },
  "ductwork-replacement": {
    slug: "ductwork-replacement",
    name: "Ductwork Replacement",
    navLabel: "Duct Replace",
    shortDescription: "Ductwork replacement for damaged or poorly sized duct systems that limit comfort and efficiency.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Ductwork Replacement",
    heroSecondary: "Rebuild distribution performance with properly designed and sealed duct paths.",
    processSteps: [
      "Duct condition and layout audit",
      "Replacement layout planning",
      "New duct installation and sealing",
      "System balancing and airflow testing",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "ductwork replacement",
      relatedTerms: ["air duct replacement", "hvac duct replacement", "duct redesign", "new duct installation"],
    },
  },
  "air-handler-replacement": {
    slug: "air-handler-replacement",
    name: "Air Handler Replacement",
    navLabel: "Air Handler",
    shortDescription: "Air handler replacement for persistent blower, coil, or control issues in central HVAC systems.",
    emergencyLine: "+1 866-907-4822",
    heroPrimary: "Air Handler Replacement",
    heroSecondary: "Improve comfort delivery with a reliable air handler matched to your system.",
    processSteps: [
      "Air handler and airflow evaluation",
      "Compatibility and sizing review",
      "Replacement and integration",
      "Control and airflow commissioning",
    ],
    faqs: SERVICE_FAQS,
    seo: {
      focusKeyphrase: "air handler replacement",
      relatedTerms: ["air handler install", "hvac air handler replacement", "indoor unit replacement", "blower section replacement"],
    },
  },
};

export const SERVICE_ORDER: ServiceSlug[] = [
  "ac-repair",
  "furnace-repair",
  "heat-pump-repair",
  "mini-split-repair",
  "boiler-repair",
  "ductwork-repair",
  "thermostat-repair",
  "compressor-repair",
  "blower-motor-repair",
  "capacitor-replacement",
  "ac-unit-replacement",
  "furnace-replacement",
  "heat-pump-replacement",
  "boiler-replacement",
  "ductwork-replacement",
  "air-handler-replacement",
];

export function getServiceBySlug(service: string) {
  return SERVICES[service as ServiceSlug] ?? null;
}
