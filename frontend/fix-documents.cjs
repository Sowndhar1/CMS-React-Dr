const fs = require('fs');
const file = 'd:/NavaNala/CMS/React.dr/frontend/src/components/Screens/Documents.jsx';
let content = fs.readFileSync(file, 'utf8');

const oldStr = '<div className="screen-fade flex flex-row h-full overflow-hidden bg-slate-50/70 select-none">';
const newStr = '<div className="screen-fade flex flex-row h-full overflow-hidden p-2 bg-transparent select-none">\n      <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex flex-row gap-4 h-full min-h-full w-full overflow-hidden min-h-0">';

if (content.includes(oldStr)) {
  content = content.replace(oldStr, newStr);
  
  const lastIndex = content.lastIndexOf('</div>');
  if (lastIndex !== -1) {
    content = content.slice(0, lastIndex) + '  </div>\n    </div>' + content.slice(lastIndex + 6);
  }
  
  fs.writeFileSync(file, content);
  console.log('Fixed Documents.jsx');
} else {
  console.log('Could not find string in Documents.jsx');
}
