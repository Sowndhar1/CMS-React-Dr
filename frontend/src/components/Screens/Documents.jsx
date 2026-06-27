import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowLeft,
  Files,
  Folder,
  Upload,
  Search,
  Download,
  Trash2,
  Eye,
  Plus,
  X,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  Activity,
  CheckCircle,
  FileCheck,
  Share2,
  Printer,
  FolderInput,
  MoreVertical,
  SlidersHorizontal,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  User
} from 'lucide-react';

// Premium SVG Layered 3D Folder Component
const PremiumFolderIcon = ({ baseColor }) => {
  return (
    <div className="relative w-12 h-10 select-none">
      <svg className="w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Folder Back Tab */}
        <path d="M4 8C4 5.79086 5.79086 4 8 4H18.7303C19.8974 4 20.9934 4.51034 21.7371 5.39991L24.7891 9.05386C25.161 9.49864 25.709 9.75386 26.2925 9.75386H40C42.2091 9.75386 44 11.563 44 13.7721V32C44 34.2091 42.2091 36 40 36H8C5.79086 36 4 34.2091 4 32V8Z" fill={`url(#back-${baseColor})`} />

        {/* Inner Document Paper Sheet */}
        <path d="M8 9.5C8 8.67157 8.67157 8 9.5 8H38.5C39.3284 8 40 8.67157 40 9.5V26.5C40 27.3284 39.3284 28 38.5 28H9.5C8.67157 28 8 27.3284 8 26.5V9.5Z" fill="#ffffff" opacity="0.9" transform="rotate(-1 24 18) translate(0, -2)" />

        {/* Folder Front Flap */}
        <path d="M4 14.7721C4 13.563 4.97914 12.5839 6.18828 12.5839H41.8117C43.0209 12.5839 44 13.563 44 14.7721V32.7721C44 34.9813 42.2091 36.7721 40 36.7721H8C5.79086 36.7721 4 34.9813 4 32.7721V14.7721Z" fill={`url(#front-${baseColor})`} />

        {/* Gradients */}
        <defs>
          <linearGradient id="back-slate" x1="4" y1="4" x2="44" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#64748b" />
            <stop offset="1" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="front-slate" x1="4" y1="12.58" x2="44" y2="36.77" gradientUnits="userSpaceOnUse">
            <stop stopColor="#94a3b8" />
            <stop offset="1" stopColor="#64748b" />
          </linearGradient>

          <linearGradient id="back-blue" x1="4" y1="4" x2="44" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2563eb" />
            <stop offset="1" stopColor="#1e3a8a" />
          </linearGradient>
          <linearGradient id="front-blue" x1="4" y1="12.58" x2="44" y2="36.77" gradientUnits="userSpaceOnUse">
            <stop stopColor="#60a5fa" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>

          <linearGradient id="back-red" x1="4" y1="4" x2="44" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#b91c1c" />
            <stop offset="1" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="front-red" x1="4" y1="12.58" x2="44" y2="36.77" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f87171" />
            <stop offset="1" stopColor="#dc2626" />
          </linearGradient>

          <linearGradient id="back-green" x1="4" y1="4" x2="44" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#059669" />
            <stop offset="1" stopColor="#064e3b" />
          </linearGradient>
          <linearGradient id="front-green" x1="4" y1="12.58" x2="44" y2="36.77" gradientUnits="userSpaceOnUse">
            <stop stopColor="#34d399" />
            <stop offset="1" stopColor="#10b981" />
          </linearGradient>

          <linearGradient id="back-orange" x1="4" y1="4" x2="44" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#d97706" />
            <stop offset="1" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="front-orange" x1="4" y1="12.58" x2="44" y2="36.77" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbbf24" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>

          <linearGradient id="back-purple" x1="4" y1="4" x2="44" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#7c3aed" />
            <stop offset="1" stopColor="#4c1d95" />
          </linearGradient>
          <linearGradient id="front-purple" x1="4" y1="12.58" x2="44" y2="36.77" gradientUnits="userSpaceOnUse">
            <stop stopColor="#a78bfa" />
            <stop offset="1" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      {baseColor === 'purple' && (
        <div className="absolute top-[22px] left-[17px] flex gap-0.5 pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-85"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-85"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-white opacity-85"></span>
        </div>
      )}
    </div>
  );
};

// File Badge & Icon component
const FileIconComponent = ({ filename, type }) => {
  const isPdf = type.toLowerCase() === 'pdf' || filename.endsWith('.pdf');
  const isImage = type.toLowerCase() === 'img' || type.toLowerCase() === 'jpg' || type.toLowerCase() === 'png' || filename.endsWith('.jpg') || filename.endsWith('.png') || filename.endsWith('.jpeg');

  if (isPdf) {
    return (
      <div className="w-9 h-9 rounded-xl bg-red-50 text-red-650 flex flex-col items-center justify-center border border-red-100/50 flex-shrink-0 shadow-sm">
        <span className="text-[6.5px] font-extrabold uppercase bg-red-600 text-white px-0.5 rounded-[2px] tracking-wide -mt-0.5 scale-90">PDF</span>
        <FileText size={15} className="text-red-500 mt-0.5" />
      </div>
    );
  }
  if (isImage) {
    return (
      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-650 flex flex-col items-center justify-center border border-blue-100/50 flex-shrink-0 shadow-sm">
        <span className="text-[6.5px] font-extrabold uppercase bg-blue-600 text-white px-0.5 rounded-[2px] tracking-wide -mt-0.5 scale-90">IMG</span>
        <ImageIcon size={15} className="text-blue-500 mt-0.5" />
      </div>
    );
  }
  return (
    <div className="w-9 h-9 rounded-xl bg-slate-50 text-slate-650 flex flex-col items-center justify-center border border-slate-100 flex-shrink-0 shadow-sm">
      <span className="text-[6.5px] font-extrabold uppercase bg-slate-600 text-white px-0.5 rounded-[2px] tracking-wide -mt-0.5 scale-90">FILE</span>
      <FileCheck size={15} className="text-slate-500 mt-0.5" />
    </div>
  );
};

const Documents = () => {
  const { goBack, showScreen } = useApp();

  // Local Database of Documents (synced with screenshot details)
  const [documents, setDocuments] = useState([
    {
      name: 'Amit_Mehta_CBC_Report.pdf',
      category: 'Lab Reports',
      type: 'PDF',
      patientId: '#PT-1001',
      patientName: 'Amit Mehta',
      age: 32,
      gender: 'Male',
      size: '2.4 MB',
      date: '15 Jun 2026, 04:20 PM',
      uploadedBy: 'Admin',
      docId: '#DOC-00124'
    },
    {
      name: 'Sunita_Patel_Insulin_Chart.pdf',
      category: 'Lab Reports',
      type: 'PDF',
      patientId: '#PT-1039',
      patientName: 'Sunita Patel',
      age: 52,
      gender: 'Female',
      size: '320 KB',
      date: '15 Jun 2026, 03:40 PM',
      uploadedBy: 'Dr. Neha Kapoor',
      docId: '#DOC-00123'
    },
    {
      name: 'Rahul_Kumar_Chest_Xray.jpg',
      category: 'Lab Reports',
      type: 'JPG',
      patientId: '#PT-1036',
      patientName: 'Rahul Kumar',
      age: 28,
      gender: 'Male',
      size: '1.8 MB',
      date: '15 Jun 2026, 02:15 PM',
      uploadedBy: 'Dr. Sandeep Rao',
      docId: '#DOC-00122'
    },
    {
      name: 'Priya_Desai_Thyroid_Report.pdf',
      category: 'Lab Reports',
      type: 'PDF',
      patientId: '#PT-1044',
      patientName: 'Priya Desai',
      age: 41,
      gender: 'Female',
      size: '1.2 MB',
      date: '15 Jun 2026, 01:10 PM',
      uploadedBy: 'Dr. Sumit Verma',
      docId: '#DOC-00121'
    },
    {
      name: 'Invoice_2026_June_AmitMehta.pdf',
      category: 'Invoices',
      type: 'PDF',
      patientId: '#PT-1001',
      patientName: 'Amit Mehta',
      age: 32,
      gender: 'Male',
      size: '860 KB',
      date: '15 Jun 2026, 12:30 PM',
      uploadedBy: 'Billing Dept.',
      docId: '#INV-00125'
    },
    {
      name: 'Consent_Form_Surgery.pdf',
      category: 'Consent Forms',
      type: 'PDF',
      patientId: '#PT-1036',
      patientName: 'Rahul Kumar',
      age: 28,
      gender: 'Male',
      size: '540 KB',
      date: '15 Jun 2026, 11:45 AM',
      uploadedBy: 'Admin',
      docId: '#DOC-00120'
    },
    {
      name: 'MRI_Brain_Scan_PriyaDesai.png',
      category: 'Lab Reports',
      type: 'PNG',
      patientId: '#PT-1044',
      patientName: 'Priya Desai',
      age: 41,
      gender: 'Female',
      size: '3.6 MB',
      date: '15 Jun 2026, 10:20 AM',
      uploadedBy: 'Dr. Neha Kapoor',
      docId: '#DOC-00119'
    }
  ]);

  // Selected Document for Right Panel Preview
  const [selectedDoc, setSelectedDoc] = useState(null);

  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Latest');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [actionMessage, setActionMessage] = useState(null);
  const [uploadingState, setUploadingState] = useState(false);
  const [isPreviewPanelOpen, setIsPreviewPanelOpen] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(100);
  const [previewPage, setPreviewPage] = useState(1);
  const [showActionDropdown, setShowActionDropdown] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Patient sidebar state
  const [patientsList, setPatientsList] = useState([
    { id: '#PT-1001', name: 'Amit Mehta',   age: 32, gender: 'Male',   phone: '98765 43210', avatar: 'AM' },
    { id: '#PT-1039', name: 'Sunita Patel', age: 52, gender: 'Female', phone: '87654 32109', avatar: 'SP' },
    { id: '#PT-1036', name: 'Rahul Kumar',  age: 28, gender: 'Male',   phone: '76543 21098', avatar: 'RK' },
    { id: '#PT-1044', name: 'Priya Desai',  age: 41, gender: 'Female', phone: '65432 10987', avatar: 'PD' },
    { id: '#PT-1019', name: 'Meera Shah',   age: 39, gender: 'Female', phone: '43210 98765', avatar: 'MS' },
  ]);
  const [selectedPatient, setSelectedPatient] = useState(null); // null = show all
  const [patientSearchQuery, setPatientSearchQuery] = useState('');
  const [showAddPatientModal, setShowAddPatientModal] = useState(false);
  const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: 'Male', phone: '' });

  // Listen for Global Header Trigger Event
  useEffect(() => {
    const handleHeaderUpload = () => {
      setShowUploadModal(true);
    };
    window.addEventListener('trigger-document-upload', handleHeaderUpload);
    return () => {
      window.removeEventListener('trigger-document-upload', handleHeaderUpload);
    };
  }, []);

  // New document state
  const [newDoc, setNewDoc] = useState({
    name: '',
    category: 'Lab Reports',
    patientName: '',
    patientId: '',
    type: 'PDF'
  });

  const folderCategories = [
    { name: 'All Documents', count: 236, size: '6.4 GB', baseColor: 'slate', folderKey: 'All' },
    { name: 'Lab Reports', count: 72, size: '2.8 GB', baseColor: 'green', folderKey: 'Lab Reports' },
    { name: 'Invoices', count: 36, size: '1.6 GB', baseColor: 'orange', folderKey: 'Invoices' },
    { name: 'Consent Forms', count: 16, size: '680 MB', baseColor: 'blue', folderKey: 'Consent Forms' },
    { name: 'More Categories', count: '8+', size: 'Categories', baseColor: 'purple', folderKey: 'More' }
  ];

  // Action Handling
  const handleDownload = (name) => {
    showActionToast(`📥 Downloading document "${name}" locally...`);
  };

  const handleShare = (name) => {
    showActionToast(`🔗 Generating shareable secure link for "${name}"...`);
  };

  const handlePrint = (name) => {
    showActionToast(`🖨️ Sending "${name}" to hospital printer network...`);
  };

  const handleMove = (name) => {
    showActionToast(`📁 Opening folder selector to move "${name}"...`);
  };

  const handleDelete = (name) => {
    const updated = documents.filter(d => d.name !== name);
    setDocuments(updated);
    if (selectedDoc && selectedDoc.name === name) {
      setSelectedDoc(updated[0] || null);
    }
    showActionToast(`🗑️ Document "${name}" has been permanently deleted.`);
  };

  const showActionToast = (msg) => {
    setActionMessage(msg);
    setTimeout(() => {
      setActionMessage(null);
    }, 4000);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.patientName) {
      alert('Please fill out document title and patient name.');
      return;
    }

    setUploadingState(true);
    showActionToast(`⏳ Uploading "${newDoc.name}" to cloud vault...`);

    setTimeout(() => {
      const ext = newDoc.type.toLowerCase();
      const sanitizedName = newDoc.name.endsWith(`.${ext}`) ? newDoc.name : `${newDoc.name}.${ext}`;
      const pid = newDoc.patientId ? (newDoc.patientId.startsWith('#PT-') ? newDoc.patientId : `#PT-${newDoc.patientId}`) : `#PT-${Math.floor(1000 + Math.random() * 9000)}`;

      const fileSizes = ['1.4 MB', '420 KB', '880 KB', '2.5 MB', '620 KB'];
      const randomSize = fileSizes[Math.floor(Math.random() * fileSizes.length)];

      // Construct upload timestamp
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const hrs = now.getHours() % 12 || 12;
      const mins = String(now.getMinutes()).padStart(2, '0');
      const ampm = now.getHours() >= 12 ? 'PM' : 'AM';
      const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}, ${String(hrs).padStart(2, '0')}:${mins} ${ampm}`;

      const uploadedItem = {
        name: sanitizedName,
        category: newDoc.category,
        type: newDoc.type,
        patientId: pid,
        patientName: newDoc.patientName,
        age: 35, // Mock default age
        gender: 'Male', // Mock default gender
        size: randomSize,
        date: formattedDate,
        uploadedBy: 'Admin',
        docId: `#DOC-${Math.floor(10000 + Math.random() * 90000)}`
      };

      const newDocsList = [uploadedItem, ...documents];
      setDocuments(newDocsList);
      setSelectedDoc(uploadedItem);
      setUploadingState(false);
      setShowUploadModal(false);
      showActionToast(`✅ Successfully uploaded "${sanitizedName}"!`);

      // reset fields
      setNewDoc({
        name: '',
        category: 'Lab Reports',
        patientName: '',
        patientId: '',
        type: 'PDF'
      });
    }, 1500);
  };

  // Patient doc count helper
  const getPatientDocCount = (patientId) => documents.filter(d => d.patientId === patientId).length;

  // Filtered patients for sidebar search
  const filteredPatients = patientsList.filter(p =>
    p.name.toLowerCase().includes(patientSearchQuery.toLowerCase()) ||
    p.id.toLowerCase().includes(patientSearchQuery.toLowerCase())
  );

  // Filter & Search Logic
  const filteredDocs = documents.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchLower ||
      item.name.toLowerCase().includes(searchLower) ||
      item.patientName.toLowerCase().includes(searchLower) ||
      item.patientId.toLowerCase().includes(searchLower) ||
      item.docId.toLowerCase().includes(searchLower);

    // Patient sidebar selection filter
    const matchesPatient = !selectedPatient || item.patientId === selectedPatient.id;

    // Folder category filter
    const matchesFolder = selectedFolder === 'All' || item.category === selectedFolder;

    // Category dropdown filter
    const matchesCategoryFilter = categoryFilter === 'All' || item.category === categoryFilter;

    return matchesSearch && matchesPatient && matchesFolder && matchesCategoryFilter;
  });

  // Sort Logic
  const sortedDocs = [...filteredDocs].sort((a, b) => {
    const timeA = new Date(a.date.split(',')[0]).getTime() || 0;
    const timeB = new Date(b.date.split(',')[0]).getTime() || 0;
    return dateFilter === 'Latest' ? timeB - timeA : timeA - timeB;
  });

  // Pagination
  const ITEMS_PER_PAGE = 5;
  const totalPages = Math.max(1, Math.ceil(sortedDocs.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedDocs = sortedDocs.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE);

  // Add Patient handler
  const handleAddPatientSubmit = (e) => {
    e.preventDefault();
    if (!newPatient.name || !newPatient.age || !newPatient.phone) {
      alert('Please fill out all patient fields.');
      return;
    }
    const initials = newPatient.name.split(' ').map(n => n[0]).join('').toUpperCase();
    const created = {
      id: `#PT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      phone: newPatient.phone,
      avatar: initials,
    };
    setPatientsList(prev => [...prev, created]);
    setSelectedPatient(created);
    setShowAddPatientModal(false);
    setNewPatient({ name: '', age: '', gender: 'Male', phone: '' });
    showActionToast(`✅ Patient profile created: ${newPatient.name}`);
  };

  // Render bespoke previews depending on the selected file type/name
  const renderDocumentPreview = (doc) => {
    if (!doc) return null;

    const zoomStyle = { transform: `scale(${previewZoom / 100})`, transformOrigin: 'top center' };

    if (doc.name === 'Amit_Mehta_CBC_Report.pdf') {
      return (
        <div style={zoomStyle} className="p-4 text-[10px] text-slate-800 transition-transform duration-200">
          <div className="flex justify-between items-center border-b border-teal-600 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-teal-600 text-white flex items-center justify-center font-bold text-xs">A</div>
              <span className="text-[11px] font-bold text-teal-800 tracking-wider">apollo HOSPITALS</span>
            </div>
            <span className="text-[8px] font-semibold text-slate-400">LAB CLINICAL RECORDS</span>
          </div>

          <div className="text-center font-bold text-[11px] tracking-wider text-slate-900 mb-3 underline">
            COMPLETE BLOOD COUNT (CBC)
          </div>

          <div className="grid grid-cols-2 gap-y-1.5 bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4 text-[9px]">
            <div><span className="font-bold text-slate-500">Patient Name:</span> {doc.patientName}</div>
            <div><span className="font-bold text-slate-500">Patient ID:</span> {doc.patientId}</div>
            <div><span className="font-bold text-slate-500">Age / Gender:</span> {doc.age} Y / {doc.gender}</div>
            <div><span className="font-bold text-slate-500">Date:</span> 15 Jun 2026</div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-bold text-slate-500 text-[8.5px]">
                <th className="py-1">TEST</th>
                <th className="py-1">RESULT</th>
                <th className="py-1">UNIT</th>
                <th className="py-1">REFERENCE RANGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="text-slate-800">
                <td className="py-1.5 font-semibold">Hemoglobin</td>
                <td className="py-1.5 text-teal-700 font-bold">14.2</td>
                <td className="py-1.5">g/dL</td>
                <td className="py-1.5 text-slate-400">13.5 - 17.5</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-1.5 font-semibold">RBC Count</td>
                <td className="py-1.5">5.02</td>
                <td className="py-1.5">million/µL</td>
                <td className="py-1.5 text-slate-400">4.5 - 5.5</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-1.5 font-semibold">WBC Count</td>
                <td className="py-1.5">6,800</td>
                <td className="py-1.5">/µL</td>
                <td className="py-1.5 text-slate-400">4,000 - 11,000</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-1.5 font-semibold">Platelet Count</td>
                <td className="py-1.5 font-bold text-amber-700">3.45</td>
                <td className="py-1.5">Lakh/µL</td>
                <td className="py-1.5 text-slate-400">1.5 - 4.5</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-1.5 font-semibold">Neutrophils</td>
                <td className="py-1.5">60</td>
                <td className="py-1.5">%</td>
                <td className="py-1.5 text-slate-400">40 - 70</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-1.5 font-semibold">Lymphocytes</td>
                <td className="py-1.5">30</td>
                <td className="py-1.5">%</td>
                <td className="py-1.5 text-slate-400">20 - 40</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-1.5 font-semibold">Monocytes</td>
                <td className="py-1.5">6</td>
                <td className="py-1.5">%</td>
                <td className="py-1.5 text-slate-400">2 - 10</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-1.5 font-semibold">Eosinophils</td>
                <td className="py-1.5">3</td>
                <td className="py-1.5">%</td>
                <td className="py-1.5 text-slate-400">1 - 6</td>
              </tr>
              <tr className="text-slate-800 text-[8.5px]">
                <td className="py-1.5 font-semibold">Basophils</td>
                <td className="py-1.5">1</td>
                <td className="py-1.5">%</td>
                <td className="py-1.5 text-slate-400">0 - 2</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-5 border-t border-slate-100 pt-2 flex justify-between items-center text-[7.5px] text-slate-400 font-semibold">
            <span>Signature: Dr. Sumit Verma</span>
            <span>Generated: Automated System</span>
          </div>
        </div>
      );
    }

    if (doc.name === 'Sunita_Patel_Insulin_Chart.pdf') {
      return (
        <div style={zoomStyle} className="p-4 text-[10px] text-slate-800 transition-transform duration-200">
          <div className="flex justify-between items-center border-b border-rose-600 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold text-rose-800 tracking-wider">APOLLO DIABETES CARE</span>
            </div>
            <span className="text-[8px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">CLINICAL CHART LOG</span>
          </div>

          <div className="text-center font-bold text-[11px] tracking-wider text-slate-950 mb-3">
            INSULIN DOSAGE CHART & LOG
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4 text-[9px] grid grid-cols-2 gap-y-1">
            <div><span className="font-bold text-slate-500">Patient Name:</span> {doc.patientName}</div>
            <div><span className="font-bold text-slate-500">Patient ID:</span> {doc.patientId}</div>
            <div><span className="font-bold text-slate-500">Age:</span> {doc.age} Y / Female</div>
            <div><span className="font-bold text-slate-500">Target Fasting:</span> &lt; 110 mg/dL</div>
          </div>

          <div className="space-y-2.5">
            <div className="border border-slate-100 p-2 rounded-lg bg-[#fffdfa]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-[#810B38]">Morning (Fasting)</span>
                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">8 Units</span>
              </div>
              <p className="text-[9px] text-slate-400 font-medium">Type: Actrapid (Short acting) • 30 mins before breakfast</p>
            </div>

            <div className="border border-slate-100 p-2 rounded-lg bg-[#fffdfa]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-slate-800">Afternoon (Lunch)</span>
                <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">6 Units</span>
              </div>
              <p className="text-[9px] text-slate-400 font-medium">Type: Actrapid (Short acting) • 15 mins before lunch</p>
            </div>

            <div className="border border-slate-100 p-2 rounded-lg bg-[#fffdfa]">
              <div className="flex justify-between items-center mb-1">
                <span className="font-extrabold text-teal-700">Night (Bedtime)</span>
                <span className="font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">10 Units</span>
              </div>
              <p className="text-[9px] text-slate-400 font-medium">Type: Lantus (Long acting) • Inject daily at 9:30 PM</p>
            </div>
          </div>

          <div className="mt-4 p-2 rounded bg-amber-50 border border-amber-100/60 text-[8.5px] text-amber-800 font-medium leading-relaxed">
            <strong>Notes:</strong> Monitor blood glucose level twice daily. If blood glucose drops below 70 mg/dL, consume 15g fast sugars immediately.
          </div>
        </div>
      );
    }

    if (doc.name === 'Rahul_Kumar_Chest_Xray.jpg') {
      return (
        <div style={zoomStyle} className="p-3 text-[10px] transition-transform duration-200">
          <div className="text-slate-800 font-semibold text-[10.5px] mb-2 flex items-center justify-between">
            <span>Chest PA Radiography Film</span>
            <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">15-06-2026</span>
          </div>
          <svg className="w-full h-52 bg-[#020617] rounded-xl shadow-inner border border-slate-800" viewBox="0 0 100 80">
            {/* Spine */}
            <line x1="50" y1="10" x2="50" y2="70" stroke="#f1f5f9" strokeWidth="2.5" opacity="0.75" />
            {/* Clavicles */}
            <path d="M 50 15 Q 70 12 90 22" stroke="#f1f5f9" strokeWidth="1.8" fill="none" opacity="0.7" />
            <path d="M 50 15 Q 30 12 10 22" stroke="#f1f5f9" strokeWidth="1.8" fill="none" opacity="0.7" />
            {/* Ribcage */}
            <path d="M 48 20 A 25 15 0 0 0 15 32" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 52 20 A 25 15 0 0 1 85 32" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 48 25 A 30 18 0 0 0 12 40" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 52 25 A 30 18 0 0 1 88 40" stroke="#e2e8f0" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M 48 30 A 35 20 0 0 0 10 48" stroke="#cbd5e1" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 52 30 A 35 20 0 0 1 90 48" stroke="#cbd5e1" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M 48 37 A 40 22 0 0 0 12 58" stroke="#94a3b8" strokeWidth="1.2" fill="none" opacity="0.55" />
            <path d="M 52 37 A 40 22 0 0 1 88 58" stroke="#94a3b8" strokeWidth="1.2" fill="none" opacity="0.55" />
            {/* Lung Shadows */}
            <path d="M 22 22 C 30 20, 42 22, 44 45 C 44 55, 38 65, 22 62 C 17 50, 17 30, 22 22 Z" fill="#1e293b" opacity="0.45" />
            <path d="M 78 22 C 70 20, 58 22, 56 45 C 56 55, 62 65, 78 62 C 83 50, 83 30, 78 22 Z" fill="#1e293b" opacity="0.45" />

            <circle cx="50" cy="48" r="14" fill="#0f172a" opacity="0.5" />
            {/* Film Labels */}
            <text x="8" y="14" fill="#ef4444" fontSize="4.5" fontWeight="extrabold" opacity="0.8">R</text>
            <text x="88" y="14" fill="#3b82f6" fontSize="4.5" fontWeight="extrabold" opacity="0.8">L</text>

            <rect x="25" y="66" width="50" height="9" rx="1.5" fill="black" opacity="0.75" />
            <text x="50" y="72" fill="#94a3b8" fontSize="3" textAnchor="middle" letterSpacing="0.05em" fontWeight="bold">APOLLO DIAGE • #PT-1036 • PA</text>
          </svg>
          <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[8.5px] leading-relaxed text-slate-500 font-medium">
            <strong>Diagnosis Summary:</strong> Normal chest PA radiograph. Heart size is within normal limits. Lungs are clear of active infiltrates, consolidation, or pleural effusion. Bony thoracic cage is intact.
          </div>
        </div>
      );
    }

    if (doc.name === 'Priya_Desai_Thyroid_Report.pdf') {
      return (
        <div style={zoomStyle} className="p-4 text-[10px] text-slate-800 transition-transform duration-200">
          <div className="flex justify-between items-center border-b border-emerald-600 pb-2 mb-3">
            <span className="text-[11px] font-bold text-emerald-800 tracking-wider">APOLLO DIAGNOSTICS</span>
            <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">ENDOCRINOLOGY</span>
          </div>

          <div className="text-center font-bold text-[11px] tracking-wider text-slate-950 mb-3 underline">
            THYROID PROFILE (T3, T4, TSH)
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-4 text-[9px] grid grid-cols-2 gap-y-1">
            <div><span className="font-bold text-slate-500">Patient Name:</span> {doc.patientName}</div>
            <div><span className="font-bold text-slate-500">Patient ID:</span> {doc.patientId}</div>
            <div><span className="font-bold text-slate-500">Age:</span> {doc.age} Y / Female</div>
            <div><span className="font-bold text-slate-500">Date:</span> 15 Jun 2026</div>
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 font-bold text-slate-500 text-[8.5px]">
                <th className="py-1.5">TEST PARAMETER</th>
                <th className="py-1.5">RESULT</th>
                <th className="py-1.5">UNIT</th>
                <th className="py-1.5">REFERENCE RANGE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="text-slate-800">
                <td className="py-2.5 font-semibold">Total Triiodothyronine (T3)</td>
                <td className="py-2.5 font-bold">1.25</td>
                <td className="py-2.5">ng/mL</td>
                <td className="py-2.5 text-slate-400">0.80 - 2.00</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-2.5 font-semibold">Total Thyroxine (T4)</td>
                <td className="py-2.5 font-bold">7.80</td>
                <td className="py-2.5">µg/dL</td>
                <td className="py-2.5 text-slate-400">4.80 - 12.00</td>
              </tr>
              <tr className="text-slate-800">
                <td className="py-2.5 font-semibold">Thyroid Stimulating Hormone (TSH)</td>
                <td className="py-2.5 font-extrabold text-teal-700">4.12</td>
                <td className="py-2.5">µIU/mL</td>
                <td className="py-2.5 text-slate-400">0.45 - 4.50</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4 p-2 rounded bg-teal-50 border border-teal-100/50 text-[8.5px] text-teal-850 font-semibold text-center">
            Interpretation: EUTHYROID STATE (Normal thyroid function markers)
          </div>
        </div>
      );
    }

    if (doc.name === 'Invoice_2026_June_AmitMehta.pdf') {
      return (
        <div style={zoomStyle} className="p-4 text-[10px] text-slate-800 transition-transform duration-200">
          <div className="flex justify-between items-start border-b border-amber-600 pb-2.5 mb-3">
            <div>
              <span className="text-[11px] font-extrabold text-slate-800 tracking-wider">CMS CLINICAL GATEWAY</span>
              <p className="text-[7.5px] text-slate-400">Regd Clinic Billing & Finance Dept.</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-extrabold text-[#810B38]">INVOICE</span>
              <p className="text-[7.5px] font-semibold text-slate-400 mt-0.5">{doc.docId}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 mb-3 text-[9px] grid grid-cols-2 gap-y-1">
            <div><span className="font-bold text-slate-500">Bill To:</span> {doc.patientName}</div>
            <div><span className="font-bold text-slate-500">Patient ID:</span> {doc.patientId}</div>
            <div><span className="font-bold text-slate-500">Invoice Date:</span> 15 Jun 2026</div>
            <div><span className="font-bold text-slate-500">Payment Mode:</span> UPI (Paid)</div>
          </div>

          <table className="w-full text-left border-collapse text-[9px] mb-3">
            <thead>
              <tr className="border-b border-slate-200 font-bold text-slate-400 text-[8.5px]">
                <th className="py-1">DESCRIPTION</th>
                <th className="py-1 text-right">QTY</th>
                <th className="py-1 text-right">RATE</th>
                <th className="py-1 text-right">AMOUNT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 font-medium">
              <tr>
                <td className="py-1.5 font-bold">Consultation (Dr. Rajan Kumar)</td>
                <td className="py-1.5 text-right">1</td>
                <td className="py-1.5 text-right">₹500.00</td>
                <td className="py-1.5 text-right">₹500.00</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold">CBC Lab Test Fee (Apollo Path)</td>
                <td className="py-1.5 text-right">1</td>
                <td className="py-1.5 text-right">₹300.00</td>
                <td className="py-1.5 text-right">₹300.00</td>
              </tr>
              <tr>
                <td className="py-1.5 font-bold">Pharmacy (Amlodipine + Paracetamol)</td>
                <td className="py-1.5 text-right">1</td>
                <td className="py-1.5 text-right">₹60.00</td>
                <td className="py-1.5 text-right">₹60.00</td>
              </tr>
            </tbody>
          </table>

          <div className="border-t border-slate-200 pt-2 flex flex-col items-end text-[9.5px] font-bold text-slate-800 gap-1">
            <div className="flex gap-4">
              <span className="text-slate-400 font-medium">Subtotal:</span>
              <span>₹860.00</span>
            </div>
            <div className="flex gap-4">
              <span className="text-slate-400 font-medium">CGST / SGST (0%):</span>
              <span>₹0.00</span>
            </div>
            <div className="flex gap-4 border-t border-slate-200 pt-1.5 text-[10.5px] text-[#810B38]">
              <span>Grand Total:</span>
              <span>₹860.00</span>
            </div>
          </div>
        </div>
      );
    }

    if (doc.name === 'Consent_Form_Surgery.pdf') {
      return (
        <div style={zoomStyle} className="p-4 text-[9.5px] text-slate-800 transition-transform duration-200">
          <div className="border-b border-slate-200 pb-2 mb-2.5 text-center">
            <span className="text-[11px] font-extrabold text-slate-800 tracking-wider">INFORMED SURGICAL CONSENT</span>
            <p className="text-[7.5px] text-slate-400">APOLLO HOSPITAL MEDICAL REGULATORY SYSTEMS</p>
          </div>

          <div className="bg-slate-50 p-2 rounded border border-slate-100 mb-2.5 text-[8.5px] grid grid-cols-2 gap-y-0.5">
            <div><span className="font-bold text-slate-500">Patient Name:</span> {doc.patientName}</div>
            <div><span className="font-bold text-slate-500">Patient ID:</span> {doc.patientId}</div>
            <div><span className="font-bold text-slate-500">Proposed Procedure:</span> Appendectomy</div>
            <div><span className="font-bold text-slate-500">Surgeon:</span> Dr. Sandeep Rao</div>
          </div>

          <p className="text-[8.5px] text-slate-500 leading-relaxed font-medium mb-3">
            I, the undersigned patient, hereby authorize Dr. Sandeep Rao and assisting staff to perform the surgical procedure of Appendectomy. The nature, purpose, risks (including bleeding, infection, and anesthesia hazards), and alternative treatments have been fully explained to me. I acknowledge that no guarantee of specific outcome has been made. I consent to anesthesia administration and necessary path reports.
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="border-t border-slate-300 pt-1.5">
              <div className="font-serif italic text-teal-800 font-semibold mb-0.5" style={{ textShadow: '0.5px 0.5px #ccf' }}>Rahul Kumar</div>
              <p className="text-[7.5px] text-slate-400 font-bold uppercase">Patient Signature & Date</p>
            </div>
            <div className="border-t border-slate-300 pt-1.5">
              <div className="font-serif italic text-slate-650 font-semibold mb-0.5" style={{ textShadow: '0.5px 0.5px #ccc' }}>Sandeep Rao, M.D.</div>
              <p className="text-[7.5px] text-slate-400 font-bold uppercase">Surgeon Signature & Date</p>
            </div>
          </div>
        </div>
      );
    }

    if (doc.name === 'MRI_Brain_Scan_PriyaDesai.png') {
      return (
        <div style={zoomStyle} className="p-3 text-[10px] transition-transform duration-200">
          <div className="text-slate-800 font-semibold text-[10.5px] mb-2 flex items-center justify-between">
            <span>MRI Brain Scan (T2 Image)</span>
            <span className="text-[8px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded font-mono">15-06-2026</span>
          </div>
          <svg className="w-full h-52 bg-[#020617] rounded-xl shadow-inner border border-slate-800" viewBox="0 0 100 80">
            {/* Brain Scan outline */}
            <circle cx="50" cy="40" r="33" stroke="#475569" strokeWidth="2.5" fill="#0f172a" />
            <path d="M 50 10 C 38 10, 20 22, 20 40 C 20 58, 38 70, 50 70 C 62 70, 80 58, 80 40 C 80 22, 62 10, 50 10 Z" fill="none" stroke="#64748b" strokeWidth="1.8" opacity="0.6" />

            {/* Ventricles */}
            <path d="M 50 24 C 44 27, 44 34, 40 37 C 44 41, 46 47, 50 49 C 54 47, 56 41, 60 37 C 56 34, 56 27, 50 24 Z" fill="none" stroke="#f1f5f9" strokeWidth="1.2" opacity="0.8" />

            {/* Brain convolutions */}
            <path d="M 33 30 C 27 33, 27 45, 33 48" fill="none" stroke="#cbd5e1" strokeWidth="1.2" opacity="0.6" />
            <path d="M 67 30 C 73 33, 73 45, 67 48" fill="none" stroke="#cbd5e1" strokeWidth="1.2" opacity="0.6" />
            <path d="M 44 18 Q 50 22 56 18" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.6" />
            <path d="M 38 58 Q 50 54 62 58" fill="none" stroke="#cbd5e1" strokeWidth="1" opacity="0.6" />

            {/* Scan Labels */}
            <text x="8" y="14" fill="#3b82f6" fontSize="4" fontWeight="bold" opacity="0.7">SE/M</text>
            <text x="88" y="14" fill="#3b82f6" fontSize="4" fontWeight="bold" opacity="0.7">T2</text>

            <rect x="25" y="66" width="50" height="9" rx="1.5" fill="black" opacity="0.75" />
            <text x="50" y="72" fill="#94a3b8" fontSize="3" textAnchor="middle" letterSpacing="0.05em" fontWeight="bold">MRI BRAIN TRANSVERSE VIEW</text>
          </svg>
          <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[8.5px] leading-relaxed text-slate-500 font-medium">
            <strong>Diagnosis Summary:</strong> Multi-planar T1 and T2 weighted MR imaging of brain. No evidence of space occupying lesion, acute infarct, or intracranial hemorrhage. Normal ventricular configuration. Ventricles are within standard volume thresholds.
          </div>
        </div>
      );
    }

    // Default Fallback
    return (
      <div style={zoomStyle} className="p-10 text-center text-slate-400 text-xs font-semibold">
        <FileCheck className="w-10 h-10 mx-auto text-slate-300 mb-2" />
        No live preview generated for this file format.
      </div>
    );
  };

  return (
    <div className="screen-fade flex flex-row h-full overflow-hidden bg-slate-50/70 select-none">

      {/* ===== LEFT PATIENT SIDEBAR ===== */}
      <div className="w-64 flex-shrink-0 bg-white border-r border-slate-150 flex flex-col h-full shadow-sm">
        
        {/* Sidebar Header */}
        <div className="px-4 pt-5 pb-3 flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] font-black text-slate-800 uppercase tracking-wider">Patients</span>
          <button
            onClick={() => setShowAddPatientModal(true)}
            className="flex items-center gap-0.5 text-[10.5px] font-extrabold text-[#810B38] hover:text-[#6B082D] hover:underline cursor-pointer"
          >
            <Plus size={11} strokeWidth={2.8} />
            <span>Add Patient</span>
          </button>
        </div>

        {/* Patient Search */}
        <div className="px-3 pb-3 flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
            <input
              type="text"
              placeholder="Search patient by name or ID..."
              value={patientSearchQuery}
              onChange={(e) => setPatientSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-2 text-[11px] text-slate-700 focus:outline-none focus:border-[#810B38] transition-all"
            />
          </div>
        </div>

        {/* Patient List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1 pb-3">
          {/* All Patients option */}
          <div
            onClick={() => { setSelectedPatient(null); setCurrentPage(1); }}
            className={`px-3 py-2.5 rounded-xl cursor-pointer flex items-center gap-2.5 transition-all duration-150 ${
              !selectedPatient
                ? 'bg-[#FAF5F0] border border-[#DCC3AA]/40 shadow-sm'
                : 'hover:bg-slate-50'
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 ${
              !selectedPatient ? 'bg-[#810B38] text-white' : 'bg-slate-100 text-slate-500'
            }`}>
              <User size={14} />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-800 truncate">All Patients</p>
              <p className="text-[9.5px] text-slate-400 font-medium">{documents.length} documents</p>
            </div>
          </div>

          {filteredPatients.length > 0 ? filteredPatients.map((pat) => {
            const isActive = selectedPatient?.id === pat.id;
            const docCount = getPatientDocCount(pat.id);
            const avatarColors = {
              AM: 'bg-blue-600', SP: 'bg-rose-500', RK: 'bg-emerald-600',
              PD: 'bg-violet-600', MS: 'bg-amber-500'
            };
            const color = avatarColors[pat.avatar] || 'bg-slate-600';
            return (
              <div
                key={pat.id}
                onClick={() => { setSelectedPatient(pat); setCurrentPage(1); setSelectedDoc(null); setIsPreviewPanelOpen(false); }}
                className={`px-3 py-2.5 rounded-xl cursor-pointer flex items-center justify-between gap-2 transition-all duration-150 ${
                  isActive
                    ? 'bg-[#FAF5F0] border border-[#DCC3AA]/40 shadow-sm scale-[1.01]'
                    : 'hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-full ${isActive ? 'bg-[#810B38]' : color} text-white flex items-center justify-center text-[10px] font-extrabold flex-shrink-0 shadow-sm`}>
                    {pat.avatar}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 truncate">{pat.name}</p>
                    <p className="text-[9.5px] text-slate-400 font-medium">{pat.id} · {pat.age} Yrs, {pat.gender}</p>
                  </div>
                </div>
                {docCount > 0 && (
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9.5px] font-extrabold flex-shrink-0 ${
                    isActive ? 'bg-[#810B38] text-white' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {docCount}
                  </span>
                )}
              </div>
            );
          }) : (
            <p className="text-center text-[11px] text-slate-400 py-6">No patients found.</p>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-4 py-3 flex-shrink-0">
          <button
            onClick={() => showScreen('patients')}
            className="w-full flex items-center justify-between text-[11px] font-bold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <span>View All Patients</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT CONTAINER ===== */}
      <div className="flex-1 flex flex-col gap-4 overflow-y-auto h-full p-6 min-w-0 pr-4">

        {/* Toast Notification Widget */}
        {actionMessage && (
          <div className="fixed top-4 right-4 bg-slate-900 text-white text-xs font-semibold px-4.5 py-3.5 rounded-2xl shadow-xl z-50 animate-fadeIn max-w-sm flex items-center gap-3 border border-white/10">
            <Activity size={15} className="text-[#F1E2D1] animate-pulse" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Title Block Header */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="btn-ghost p-1 rounded-lg text-slate-500 hover:text-slate-800 cursor-pointer"
            onClick={goBack}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold text-slate-800">Documents Vault</h1>
              <ShieldAlert size={15} className="text-[#810B38]" />
            </div>

          </div>
        </div>

        {/* Categories Grid - Horizontal Flex Row */}
        <div className="flex gap-3 overflow-x-auto flex-shrink-0 pb-0.5">
          {folderCategories.map((folder, index) => {
            const isActive = selectedFolder === folder.folderKey;
            return (
              <div
                key={index}
                onClick={() => {
                  if (folder.folderKey !== 'More') {
                    setSelectedFolder(folder.folderKey);
                  } else {
                    showActionToast("📁 Expanding more document directory vault categories...");
                  }
                }}
                className={`flex flex-col justify-between p-3.5 bg-white border rounded-2xl cursor-pointer transition-all duration-300 group select-none min-w-[130px] flex-1 ${isActive
                  ? 'border-[#DCC3AA] bg-[#FAF5F0] shadow-md'
                  : 'border-slate-200 hover:shadow-md hover:border-slate-300'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <PremiumFolderIcon baseColor={folder.baseColor} />
                  <span className="text-[10px] font-extrabold text-slate-400 bg-slate-100/80 px-2 py-0.5 rounded-full mt-0.5">
                    {folder.count} {folder.folderKey === 'More' ? '' : 'Files'}
                  </span>
                </div>
                <div className="mt-4">
                  <p className="text-[11px] font-bold text-slate-700 leading-snug mt-1">{folder.name}</p>
                  {folder.folderKey === 'More' ? (
                    <button
                      className="text-[9.5px] text-[#810B38] font-bold mt-1.5 hover:underline"
                      onClick={(e) => {
                        e.stopPropagation();
                        showActionToast("🔍 Viewing all folders & custom clinical metadata tables...");
                      }}
                    >
                      View All
                    </button>
                  ) : (
                    <p className="text-[9.5px] text-slate-400 font-bold mt-1.5">{folder.size} Total Size</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Drag & Drop Upload - Compact */}
        <div
          className="py-3 px-4 border border-dashed border-slate-200 hover:border-[#810B38]/40 hover:bg-[#FAF5F0]/20 bg-white rounded-xl flex items-center justify-between gap-4 transition-all duration-200 cursor-pointer select-none flex-shrink-0"
          onClick={() => setShowUploadModal(true)}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center flex-shrink-0 border border-slate-200">
              <Upload size={16} className="text-[#810B38]" />
            </div>
            <div>
              <h3 className="text-[11.5px] font-bold text-slate-700 leading-none">Drag &amp; drop files here to upload</h3>
              <p className="text-[10.5px] text-slate-400 mt-0.5 font-medium">
                Reports, scans, invoices or any medical documents
              </p>
            </div>
          </div>
          <button
            className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-[#810B38]/40 hover:bg-[#FAF5F0] text-slate-600 hover:text-[#810B38] rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex-shrink-0"
            type="button"
          >
            Browse Files
          </button>
        </div>

        {/* Main List Vault Table section */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col flex-grow shadow-sm min-h-0">

          {/* Table Filters Header bar */}
          <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-4 bg-slate-50/20 flex-shrink-0">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                className="w-full bg-white border border-slate-250 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-700 focus:outline-none focus:border-[#810B38] transition-all"
                placeholder="Search by patient name, document name, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-[10px] font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2.5">
              {/* Category selector dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-slate-250 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-650">
                <span className="text-[10px] text-slate-450 font-medium">Category:</span>
                <select
                  className="bg-transparent focus:outline-none cursor-pointer pr-1 text-slate-700"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {Array.from(new Set(documents.map(d => d.category))).map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Date selector dropdown */}
              <div className="flex items-center gap-1.5 bg-white border border-slate-250 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-650">
                <span className="text-[10px] text-slate-450 font-medium">Date:</span>
                <select
                  className="bg-transparent focus:outline-none cursor-pointer pr-1 text-slate-700"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                >
                  <option value="Latest">Latest</option>
                  <option value="Oldest">Oldest</option>
                </select>
              </div>

              {/* Advanced Filter button */}
              <button
                onClick={() => showActionToast("⚙️ Opening advanced data filter queries...")}
                className="flex items-center gap-1.5 bg-white border border-slate-250 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-650 hover:bg-slate-50 shadow-xs cursor-pointer"
              >
                <SlidersHorizontal size={13.5} className="text-slate-500" />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Documents Scrollable Table */}
          <div className="flex-1 overflow-y-auto min-h-0">
            <table className="w-full text-left border-collapse min-w-[560px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-white border-b-2 border-slate-100 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">DOCUMENT NAME</th>
                  <th className="py-3 px-4">CATEGORY</th>
                  <th className="py-3 px-4">PATIENT</th>
                  <th className="py-3 px-4">DATE UPLOADED</th>
                  <th className="py-3 px-5 text-right">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedDocs.length > 0 ? (
                  paginatedDocs.map((item, idx) => {
                    const isSelected = selectedDoc && selectedDoc.name === item.name;
                    return (
                      <tr
                        key={idx}
                        onClick={() => {
                          setSelectedDoc(item);
                          setIsPreviewPanelOpen(true);
                        }}
                        className={`text-xs text-slate-650 transition-colors duration-150 cursor-pointer group hover:bg-slate-50/50 ${isSelected ? 'bg-slate-50/80 border-l-2 border-[#810B38]' : ''
                          }`}
                      >

                        {/* Doc name & info */}
                        <td className="py-3.5 px-5 font-bold text-slate-800">
                          <div className="flex items-center gap-3">
                            <FileIconComponent filename={item.name} type={item.type} />
                            <div className="flex flex-col min-w-0">
                              <span className="truncate max-w-[200px]" title={item.name}>{item.name}</span>
                              <span className="text-[10px] text-slate-400 font-medium font-mono mt-0.5">{item.docId}</span>
                            </div>
                          </div>
                        </td>

                        {/* Category badge */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 text-[8.5px] font-extrabold rounded-full uppercase tracking-wide whitespace-nowrap ${
                            item.category === 'Lab Reports' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                            item.category === 'Invoices' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                            item.category === 'Consent Forms' ? 'bg-violet-50 text-violet-700 border border-violet-200' :
                            item.category === 'Scans & Images' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                            item.category === 'Discharge Summaries' ? 'bg-orange-50 text-orange-700 border border-orange-200' :
                            item.category === 'Prescriptions' ? 'bg-pink-50 text-pink-700 border border-pink-200' :
                            'bg-slate-100 text-slate-600 border border-slate-200'
                          }`}>
                            {item.category}
                          </span>
                        </td>

                        {/* Patient info */}
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          <div className="flex flex-col">
                            <span>{item.patientName}</span>
                            <span className="text-[10px] text-slate-450 font-semibold font-mono mt-0.5">{item.patientId}</span>
                          </div>
                        </td>

                        {/* Date uploaded - two-line format */}
                        <td className="py-3.5 px-4">
                          <div className="flex flex-col leading-tight">
                            <span className="text-[11.5px] font-semibold text-slate-700">{item.date.split(',')[0]}</span>
                            <span className="text-[9.5px] text-slate-400 font-medium mt-0.5">{item.date.split(',').slice(1).join(',').trim()}</span>
                          </div>
                        </td>

                        {/* Action buttons (Row specific) */}
                        <td className="py-3.5 px-5 text-right relative" onClick={(e) => e.stopPropagation()}>
                          <div className="flex items-center justify-end gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setSelectedDoc(item);
                                setIsPreviewPanelOpen(true);
                              }}
                              className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg cursor-pointer transition-colors"
                              title="Preview File"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => handleDownload(item.name)}
                              className="p-1.5 hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 rounded-lg cursor-pointer transition-colors"
                              title="Download File"
                            >
                              <Download size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.name)}
                              className="p-1.5 hover:bg-rose-50 text-red-500 hover:text-red-700 rounded-lg cursor-pointer transition-colors"
                              title="Delete File"
                            >
                              <Trash2 size={14} />
                            </button>
                            <button
                              onClick={() => setShowActionDropdown(showActionDropdown === idx ? null : idx)}
                              className="p-1.5 hover:bg-slate-100 text-slate-550 hover:text-slate-800 rounded-lg cursor-pointer transition-colors"
                            >
                              <MoreVertical size={14} />
                            </button>
                          </div>

                          {showActionDropdown === idx && (
                            <div className="absolute right-6 top-10 w-36 bg-white border border-slate-200 rounded-xl shadow-lg z-10 py-1 text-left animate-fadeIn">
                              <button
                                onClick={() => { handleShare(item.name); setShowActionDropdown(null); }}
                                className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-xs font-semibold"
                              >
                                <Share2 size={12} className="text-[#810B38]" />
                                <span>Share Doc</span>
                              </button>
                              <button
                                onClick={() => { handlePrint(item.name); setShowActionDropdown(null); }}
                                className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-xs font-semibold"
                              >
                                <Printer size={12} className="text-slate-500" />
                                <span>Print Doc</span>
                              </button>
                              <button
                                onClick={() => { handleMove(item.name); setShowActionDropdown(null); }}
                                className="w-full px-3.5 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2 text-xs font-semibold"
                              >
                                <FolderInput size={12} className="text-slate-500" />
                                <span>Move to Folder</span>
                              </button>
                            </div>
                          )}
                        </td>

                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="py-16 text-center text-slate-400 text-xs font-semibold">
                      No documents found matching the search/filter parameters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Table pagination footer controls */}
          <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/20 flex items-center justify-between text-[11px] text-slate-400 font-bold flex-shrink-0">
            <span>
              Showing {sortedDocs.length === 0 ? 0 : (safePage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(safePage * ITEMS_PER_PAGE, sortedDocs.length)} of {sortedDocs.length} document{sortedDocs.length !== 1 ? 's' : ''}
            </span>

            {totalPages > 1 && (
              <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 shadow-xs">
                <button
                  disabled={safePage === 1}
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                  <button
                    key={pg}
                    onClick={() => setCurrentPage(pg)}
                    className={`w-6 h-6 rounded-lg flex items-center justify-center font-extrabold text-xs cursor-pointer ${
                      safePage === pg
                        ? 'bg-[#810B38] text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {pg}
                  </button>
                ))}

                <button
                  disabled={safePage === totalPages}
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Collapsible Right Document Detail / Preview Sidebar Panel */}
      {isPreviewPanelOpen && selectedDoc && (
        <div className="w-[390px] flex-shrink-0 bg-white border-l border-slate-200 flex flex-col h-full overflow-hidden shadow-2xl animate-fadeIn">

          {/* Header row details */}
          <div className="px-5 py-4.5 border-b border-slate-150 flex items-center justify-between bg-slate-50/50 flex-shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <FileIconComponent filename={selectedDoc.name} type={selectedDoc.type} />
              <div className="flex flex-col min-w-0">
                <span className="text-[12px] font-extrabold text-slate-800 truncate leading-snug" title={selectedDoc.name}>{selectedDoc.name}</span>
                <span className="text-[9.5px] font-bold text-slate-450 tracking-wide mt-0.5 uppercase">{selectedDoc.category}</span>
              </div>
            </div>
            <button
              onClick={() => setIsPreviewPanelOpen(false)}
              className="p-1.5 hover:bg-slate-150 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Sidebar scrollable contents */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5">

            {/* Patient quick details card */}
            <div className="flex items-center justify-between bg-slate-50 border border-slate-200/50 p-3.5 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FAF5F0] border-2 border-[#DCC3AA]/30 text-[#810B38] flex items-center justify-center font-black text-xs shadow-inner flex-shrink-0">
                  {selectedDoc.patientName.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-left min-w-0">
                  <h4 className="text-xs font-black text-slate-800 truncate max-w-[120px]">{selectedDoc.patientName}</h4>
                  <p className="text-[10px] text-slate-450 font-semibold mt-0.5">
                    {selectedDoc.patientId} · {selectedDoc.age} Yrs, {selectedDoc.gender}
                  </p>
                </div>
              </div>
              <button
                onClick={() => showScreen('patientdetail')}
                className="px-2.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 cursor-pointer transition-all shadow-xs flex-shrink-0"
              >
                View Profile
              </button>
            </div>

            {/* Document metadata parameters list */}
            <div className="bg-white border border-slate-150 rounded-2xl overflow-hidden text-[11px] divide-y divide-slate-100 font-semibold shadow-xs">
              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">Category</span>
                <span className="text-slate-700 font-black">{selectedDoc.category}</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">Uploaded By</span>
                <span className="text-slate-700">{selectedDoc.uploadedBy}</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">Upload Date</span>
                <span className="text-slate-700">{selectedDoc.date}</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">File Size</span>
                <span className="text-slate-700">{selectedDoc.size}</span>
              </div>
              <div className="p-3 flex justify-between items-center">
                <span className="text-slate-400">Document ID</span>
                <span className="text-slate-700 font-mono text-[10px] font-bold">{selectedDoc.docId}</span>
              </div>
            </div>

            {/* Preview Document Paper Container */}
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1.5 flex-shrink-0">
                <span className="text-xs font-black text-slate-800">Preview</span>
                <button
                  onClick={() => showActionToast("📊 Opening preview toolbar layout options...")}
                  className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
                >
                  <MoreVertical size={13.5} />
                </button>
              </div>

              {/* Bespoke rendered mockup frame */}
              <div className="border border-slate-200 bg-white rounded-2xl shadow-inner overflow-hidden flex flex-col relative">

                {/* Scrollable mockup body */}
                <div className="h-[280px] overflow-auto bg-[#fafbfc]/70 border-b border-slate-150">
                  {renderDocumentPreview(selectedDoc)}
                </div>

                {/* Preview Navigation toolbar */}
                <div className="px-3.5 py-2.5 bg-slate-50 flex items-center justify-between text-[10px] text-slate-450 font-bold select-none flex-shrink-0">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        if (previewPage > 1) {
                          setPreviewPage(prev => prev - 1);
                          showActionToast("📄 Navigating to page 1...");
                        } else {
                          showActionToast("📄 Currently viewing the first page.");
                        }
                      }}
                      className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                    >
                      <ChevronLeft size={12} />
                    </button>
                    <span className="mx-1 text-slate-600 font-extrabold">{previewPage} / 2</span>
                    <button
                      onClick={() => {
                        if (previewPage < 2) {
                          setPreviewPage(prev => prev + 1);
                          showActionToast("📄 Fetching page 2...");
                        } else {
                          showActionToast("📄 Currently viewing the final page.");
                        }
                      }}
                      className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                    >
                      <ChevronRight size={12} />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (previewZoom > 50) {
                          setPreviewZoom(z => z - 10);
                        }
                      }}
                      className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                    >
                      <ZoomOut size={12} />
                    </button>
                    <span className="w-9 text-center font-extrabold font-mono text-slate-600">{previewZoom}%</span>
                    <button
                      onClick={() => {
                        if (previewZoom < 150) {
                          setPreviewZoom(z => z + 10);
                        }
                      }}
                      className="p-1 hover:bg-slate-200 rounded text-slate-600 cursor-pointer"
                    >
                      <ZoomIn size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar quick actions grid buttons */}
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                onClick={() => handleDownload(selectedDoc.name)}
                className="flex items-center justify-center gap-2 py-3 bg-[#810B38] text-white hover:bg-[#6B082D] rounded-xl text-xs font-black shadow-xs cursor-pointer select-none transition-colors"
              >
                <Download size={13} />
                <span>Download</span>
              </button>

              <button
                onClick={() => handleShare(selectedDoc.name)}
                className="flex items-center justify-center gap-2 py-3 bg-[#FAF5F0] hover:bg-[#F1E2D1] border border-[#DCC3AA]/30 text-[#810B38] rounded-xl text-xs font-black shadow-xs cursor-pointer select-none transition-all"
              >
                <Share2 size={13} />
                <span>Share</span>
              </button>

              <button
                onClick={() => handlePrint(selectedDoc.name)}
                className="flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-black shadow-xs cursor-pointer select-none transition-colors"
              >
                <Printer size={13} />
                <span>Print</span>
              </button>

              <button
                onClick={() => handleMove(selectedDoc.name)}
                className="flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-black shadow-xs cursor-pointer select-none transition-colors"
              >
                <FolderInput size={13} />
                <span>Move to Folder</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Upload Document Modal Panel Overlay */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-[4px]">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-100">

            {/* Modal Panel Header */}
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-[#810B38] text-white">
              <div className="flex items-center gap-2">
                <Upload size={16} className="text-[#F1E2D1] animate-bounce" />
                <h3 className="text-sm font-extrabold tracking-tight">Upload Document Vault</h3>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Input Forms */}
            <form onSubmit={handleUploadSubmit} className="p-5 flex flex-col gap-3.5">

              <div>
                <label className="form-label">Document Title / File Name *</label>
                <input
                  type="text"
                  required
                  disabled={uploadingState}
                  className="form-input text-xs"
                  placeholder="e.g. Lab_Report_Blood_Count"
                  value={newDoc.name}
                  onChange={(e) => setNewDoc({ ...newDoc, name: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Document Type *</label>
                  <select
                    className="form-input form-select text-xs cursor-pointer"
                    disabled={uploadingState}
                    value={newDoc.type}
                    onChange={(e) => setNewDoc({ ...newDoc, type: e.target.value })}
                  >
                    <option value="PDF">PDF File</option>
                    <option value="IMG">Image (JPG/PNG)</option>
                    <option value="XLS">Excel Sheet (XLS/CSV)</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Category / Folder *</label>
                  <input
                    list="category-options"
                    className="form-input text-xs"
                    disabled={uploadingState}
                    placeholder="Select or type category..."
                    value={newDoc.category}
                    onChange={(e) => setNewDoc({ ...newDoc, category: e.target.value })}
                  />
                  <datalist id="category-options">
                    <option value="Lab Reports" />
                    <option value="Blood Reports" />
                    <option value="Scans & Imaging" />
                    <option value="Prescriptions" />
                    <option value="Invoices" />
                    <option value="Consent Forms" />
                    <option value="Discharge Summaries" />
                    <option value="Insurance Documents" />
                  </datalist>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Patient Name *</label>
                  <input
                    type="text"
                    required
                    disabled={uploadingState}
                    className="form-input text-xs"
                    placeholder="e.g. Amit Mehta"
                    value={newDoc.patientName}
                    onChange={(e) => setNewDoc({ ...newDoc, patientName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Patient ID (Optional)</label>
                  <input
                    type="text"
                    disabled={uploadingState}
                    className="form-input text-xs"
                    placeholder="e.g. #PT-1001"
                    value={newDoc.patientId}
                    onChange={(e) => setNewDoc({ ...newDoc, patientId: e.target.value })}
                  />
                </div>
              </div>

              {/* Progress Bar simulation */}
              {uploadingState && (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-2 animate-pulse mt-1">
                  <div className="flex justify-between items-center text-[10px] font-bold text-[#810B38]">
                    <span>Uploading file to cloud vault...</span>
                    <span>78%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[#810B38] h-full w-[78%] rounded-full"></div>
                  </div>
                </div>
              )}

              {/* Modal controls submit / cancel */}
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3.5 mt-2 flex-shrink-0">
                <button
                  type="button"
                  disabled={uploadingState}
                  onClick={() => setShowUploadModal(false)}
                  className="btn-secondary text-xs py-2 px-4 cursor-pointer font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploadingState}
                  className="px-4.5 py-2.5 bg-[#810B38] hover:bg-[#6B082D] text-white rounded-xl text-xs font-black shadow-sm transition-all duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  {uploadingState ? 'Uploading...' : 'Save File'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Add Patient Modal */}
      {showAddPatientModal && (
        <div className="fixed inset-0 bg-slate-900/40 flex items-center justify-center p-4 z-50 animate-fadeIn backdrop-blur-[4px]">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-100">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-blue-600 text-white">
              <div className="flex items-center gap-2">
                <User size={16} className="text-blue-200 animate-pulse" />
                <h3 className="text-sm font-extrabold tracking-tight">Add New Patient</h3>
              </div>
              <button onClick={() => setShowAddPatientModal(false)} className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-lg cursor-pointer">
                <X size={15} />
              </button>
            </div>

            <form onSubmit={handleAddPatientSubmit} className="p-5 flex flex-col gap-3.5">
              <div>
                <label className="form-label">Full Name *</label>
                <input type="text" required placeholder="e.g. Ramesh Chandra"
                  value={newPatient.name} onChange={e => setNewPatient({ ...newPatient, name: e.target.value })}
                  className="form-input text-xs" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Age *</label>
                  <input type="number" required placeholder="e.g. 42"
                    value={newPatient.age} onChange={e => setNewPatient({ ...newPatient, age: e.target.value })}
                    className="form-input text-xs" />
                </div>
                <div>
                  <label className="form-label">Gender *</label>
                  <select value={newPatient.gender} onChange={e => setNewPatient({ ...newPatient, gender: e.target.value })}
                    className="form-input form-select text-xs cursor-pointer">
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Phone Number *</label>
                <input type="text" required placeholder="e.g. 98765 12345"
                  value={newPatient.phone} onChange={e => setNewPatient({ ...newPatient, phone: e.target.value })}
                  className="form-input text-xs" />
              </div>
              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3.5 mt-1">
                <button type="button" onClick={() => setShowAddPatientModal(false)}
                  className="btn-secondary text-xs py-2 px-4 cursor-pointer font-bold">Cancel</button>
                <button type="submit"
                  className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black shadow-sm cursor-pointer">Save Profile</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Documents;
