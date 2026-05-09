export const COMPANIES = [
  { name: "Google", icon: "🔵", description: "System Design & Algorithms" },
  { name: "Amazon", icon: "🔶", description: "Leadership & Scalability" },
  { name: "Microsoft", icon: "🟦", description: "Problem Solving" },
  { name: "Meta", icon: "📘", description: "Technical Depth" },
  { name: "Apple", icon: "🍎", description: "Quality & Details" },
  { name: "Netflix", icon: "🎬", description: "Engineering Excellence" },
  { name: "Tesla", icon: "⚡", description: "Innovation" },
  { name: "Uber", icon: "🚗", description: "Scale & Performance" },
  { name: "Airbnb", icon: "🏠", description: "Product Thinking" },
  { name: "LinkedIn", icon: "💼", description: "Data & Networks" },
];

export const ROLE_TYPES = [
  "Frontend Engineer",
  "Backend Engineer",
  "Full Stack Engineer",
  "DevOps Engineer",
  "Data Engineer",
  "Machine Learning Engineer",
  "QA Engineer",
  "Product Manager",
];

export const getCompanyDescription = (company) => {
  return COMPANIES.find(c => c.name === company)?.description || "";
};

export const getCompanyIcon = (company) => {
  return COMPANIES.find(c => c.name === company)?.icon || "💼";
};
