export const investigations = [
  {
    id: 'county-procurement',
    name: 'County Procurement',
    state: 'Active',
    summary: 'Cross-checking vendor payments and procurement timing.',
    lastUpdated: 'Today, 14:21',
    files: 12,
    evidence: 8,
  },
  {
    id: 'environmental-exposure',
    name: 'Environmental Exposure',
    state: 'Active',
    summary: 'Tracking environmental risk reports and internal communications.',
    lastUpdated: 'Today, 11:48',
    files: 9,
    evidence: 6,
  },
  {
    id: 'public-funds',
    name: 'Public Funds Investigation',
    state: 'Draft',
    summary: 'Preliminary review of public spending patterns and disclosures.',
    lastUpdated: 'Yesterday',
    files: 6,
    evidence: 4,
  },
]

export const sources = [
  { id: 'k-17', label: 'SOURCE K-17', status: 'Protected', level: 'High' },
  { id: 'm-04', label: 'SOURCE M-04', status: 'Protected', level: 'High' },
  { id: 'r-12', label: 'SOURCE R-12', status: 'Protected', level: 'Active' },
]

export const evidenceItems = [
  { id: 'interview-042', label: 'Interview_042', type: 'Video', size: '824 MB' },
  { id: 'field-image-18', label: 'Field_Image_18', type: 'Photo', size: '14 MB' },
  { id: 'document-07', label: 'Document_07', type: 'PDF', size: '2.1 MB' },
  { id: 'audio-interview', label: 'Audio_Interview', type: 'Audio', size: '38 MB' },
]

export const chatMessages = [
  {
    id: 1,
    author: 'Legal Desk',
    time: '14:17',
    text: 'Received your update. We are reviewing the procurement timeline.',
    isIncoming: true,
  },
  {
    id: 2,
    author: 'Editor',
    time: '14:19',
    text: 'Proceed with verification before publication.',
    isIncoming: true,
  },
  {
    id: 3,
    author: 'Field Team',
    time: '14:21',
    text: 'Evidence uploaded. Source material stored in the protected vault.',
    isIncoming: false,
  },
]

export const appTiles = [
  { id: 'investigations', label: 'Investigations', icon: '▣' },
  { id: 'sources', label: 'Sources', icon: '◉' },
  { id: 'evidence', label: 'Evidence', icon: '◆' },
  { id: 'chat', label: 'Secure Chat', icon: '✉' },
  { id: 'camera', label: 'Camera', icon: '◌' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]
