import Table, { Issue } from "./components/table";
import issuesData from "./constants/issues.json";

// Type guard to ensure the data matches the Issue type
const isIssueArray = (data: unknown): data is Issue[] => {
  return Array.isArray(data) && data.every(item => 
    typeof item === 'object' &&
    item !== null &&
    'id' in item &&
    'name' in item &&
    'message' in item &&
    'status' in item &&
    'numEvents' in item &&
    'numUsers' in item &&
    'value' in item
  );
};

export default function Home() {
  // Validate the data at runtime
  if (!isIssueArray(issuesData)) {
    throw new Error('Invalid issues data format');
  }

  return <Table issues={issuesData} />;
}
