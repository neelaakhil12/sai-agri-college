const pool = require('../backend/utils/db');
async function addVideos() {
  const videos = [
    { image: '/field-visit-media/field-video.mp4', sub_label: 'Internship', label: 'Student Internship Overview', category: 'internship', type: 'video' },
    { image: '/field-visit-media/field-video.mp4', sub_label: 'Field Visit', label: 'Agriculture Field Research', category: 'field-visit', type: 'video' },
    { image: '/field-visit-media/field-video.mp4', sub_label: 'Campus Event', label: 'College Event Highlight', category: 'event', type: 'video' },
    { image: '/field-visit-media/field-video.mp4', sub_label: 'Educational Trip', label: 'Trip Memories', category: 'trip', type: 'video' }
  ];
  for (const v of videos) {
    await pool.query(
      'INSERT INTO gallery (image, sub_label, label, category, type) SELECT ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT 1 FROM gallery WHERE category = ? AND type = "video")',
      [v.image, v.sub_label, v.label, v.category, v.type, v.category]
    );
  }
  console.log('Videos synchronized');
  process.exit();
}
addVideos().catch(e => { console.error(e); process.exit(1); });
