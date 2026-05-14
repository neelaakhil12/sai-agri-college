const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'sri-sai-agriculture/src/pages/admin/AdminDashboard.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const brokenStart = content.indexOf('<SidebarLink active={activeTab === \'settings\'}');
if (brokenStart === -1) { console.log('SidebarLink marker NOT FOUND'); process.exit(1); }

const settingsViewStart = content.indexOf('\nfunction SettingsView');
if (settingsViewStart === -1) { console.log('SettingsView NOT FOUND'); process.exit(1); }

const before = content.substring(0, brokenStart);
const after = content.substring(settingsViewStart);

const middle = `          ) : null}
        </div>
      </main>
    </div>
  );
}

`;

const newContent = before + middle + after;
fs.writeFileSync(filePath, newContent, 'utf8');
console.log('SUCCESS. Total lines: ' + newContent.split('\n').length);
