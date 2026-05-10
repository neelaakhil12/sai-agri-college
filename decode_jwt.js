const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4YmRrd3h2anhhZG10dm5ibXJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4OTIyMTgsImV4cCI6MjA5MTQ2ODIxOH0.-11jIy2kP6NP31vqu1-XcR0YTB-K1t7WM8doM-LBkVw';
const payload = JSON.parse(Buffer.from(jwt.split('.')[1], 'base64').toString());
console.log(payload);
