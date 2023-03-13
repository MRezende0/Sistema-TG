import sqlQuery from "../plugins/sqlQuery.js";

export function listGroup() {
  const query = `SELECT stand.presentation as presentation, ul.name as leader, p.*, u.name as advisor, course.title as course FROM project as p 
    LEFT JOIN user_project as up ON up.project_id = p.id 
    LEFT JOIN user as u ON u.id = p.advisor_id
    LEFT JOIN user as ul ON ul.id = p.leader_id
    LEFT JOIN course ON course.id = ul.course_id
    LEFT JOIN stand ON stand.project_id = p.id`;
  const data = [];
  return sqlQuery(query, data);
}

export function listGroupPorId(id) {
  const query = `SELECT ul.name as leader, p.*, u.name as advisor, course.title as course FROM project as p 
    LEFT JOIN user_project as up ON up.project_id = p.id 
    LEFT JOIN user as u ON u.id = p.advisor_id
    LEFT JOIN user as ul ON ul.id = p.leader_id
    LEFT JOIN course ON course.id = ul.course_id
    WHERE p.id = ?`;
  const data = [id];
  return sqlQuery(query, data);
}

export function listGroupById(id) {
  const query = `SELECT ul.name as leader, p.*, u.name as advisor, course.title as course FROM project as p 
    LEFT JOIN user_project as up ON up.project_id = p.id 
    LEFT JOIN user as u ON u.id = p.advisor_id
    LEFT JOIN user as ul ON ul.id = p.leader_id
    LEFT JOIN course ON course.id = ul.course_id
    WHERE p.leader_id = ? OR up.user_id = ?`;
  const data = [id, id];
  return sqlQuery(query, data);
}

export function updateGroup(userId, termId, themeId, title, groupId) {
  const query =
    "UPDATE project SET leader_id = ?, term_id = ?, theme_id = ?, title = ? WHERE project_id = ?";
  const data = [userId, termId, themeId, title, groupId];
  return sqlQuery(query, data);
}

export function createGroup(userId, termId, themeId, title) {
  const query =
    "INSERT INTO project (leader_id, term_id, theme_id, title) VALUES (?)";
  const data = [[userId, termId, themeId, title]];
  return sqlQuery(query, data);
}

export function addInGroup(groupId, studentId) {
  const query = "INSERT INTO user_project (project_id, user_id) VALUES (?)";
  const data = [[groupId, studentId]];
  return sqlQuery(query, data);
}

export function createStudent(name, email, password, phone, course_id, RA) {
  const query =
    "INSERT INTO user (name, email, password, phone, course_id, RA, type) VALUES (?)";
  const data = [[name, email, password, phone, course_id, RA, "student"]];
  return sqlQuery(query, data);
}

export function updateStudent(name, email, password, phone, course_id, RA, id) {
  const query =
    "UPDATE user SET name = ?, email = ?, password = ?, phone = ?, course_id = ?, RA = ? WHERE id = ?";
  const data = [name, email, password, phone, course_id, RA, id];
  return sqlQuery(query, data);
}

export function groupPreference(groupId, teacherId, status) {
  const query =
    "INSERT INTO preference (project_id, teacher_id, status) VALUES (?)";
  const data = [[groupId, teacherId, status]];
  return sqlQuery(query, data);
}

export function listGroupPreference(groupId) {
  const query = "SELECT * FROM preference WHERE project_id = ?";
  const data = [groupId];
  return sqlQuery(query, data);
}

export function listCourse() {
  const query = "SELECT * FROM course";
  const data = [];
  return sqlQuery(query, data);
}
