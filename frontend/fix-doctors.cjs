const fs = require('fs');
const file = 'd:/NavaNala/CMS/React.dr/frontend/src/components/Screens/Doctors.jsx';
let content = fs.readFileSync(file, 'utf8');

const oldStr = '<div className="screen-fade h-full overflow-hidden p-4 flex flex-col gap-4 bg-slate-50/50 min-h-0">';
const newStr = '<div className="screen-fade h-full overflow-hidden p-2 bg-transparent min-h-0">\n      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-col gap-4 h-full min-h-full overflow-hidden min-h-0">';

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  
  // Find the LAST closing div and insert another div
  const parts = content.split('</div>');
  // the last element is \n  );\n};\n\nexport default Doctors;\n
  // the second to last element is whatever comes before the last </div>
  // we can just replace the last </div> with </div>\n    </div>
  const lastIndex = content.lastIndexOf('</div>');
  if (lastIndex !== -1) {
    content = content.slice(0, lastIndex) + '  </div>\n    </div>' + content.slice(lastIndex + 6);
  }
  
  fs.writeFileSync(file, content);
  console.log('Fixed Doctors.jsx');
} else {
  console.log('Could not find string in Doctors.jsx');
}
