import sqlQuery from "../plugins/sqlQuery.js";

export function createTeacher(name, email, password, phone) {
  const query =
    "INSERT INTO user (name, email, password, phone, type) VALUES (?)";
  const data = [[name, email, password, phone, "teacher"]];
  return sqlQuery(query, data);
}

export function updateTeacher(name, email, password, phone, id) {
  const query =
    "UPDATE user SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?";
  const data = [name, email, password, phone, id];
  return sqlQuery(query, data);
}

export function confirmStand(standId) {
  const query = "UPDATE stand SET confirm = true WHERE id = ?";
  const data = [standId];
  return sqlQuery(query, data);
}

export function confirmAdvisor(teacherId, groupId) {
  const query = "UPDATE project SET advisor_id = ? WHERE id = ?";
  const data = [teacherId, groupId];
  return sqlQuery(query, data);
}

export function confirmCoAdvisor(teacherId, groupId) {
  const query = "UPDATE project SET co_advisor_id = ? WHERE id = ?";
  const data = [teacherId, groupId];
  return sqlQuery(query, data);
}

export function inviteTeacher(standId, teacherId) {
  const query = "INSERT INTO stand_invited (stand_id, teacher_id) VALUES (?)";
  const data = [[standId, teacherId]];
  return sqlQuery(query, data);
}

export function listInviteTeacher(standId) {
  const query = "SELECT * FROM stand_invited WHERE stand_id = ?";
  const data = [standId];
  return sqlQuery(query, data);
}

export function listInvitations(userId) {
  const query = 
    `SELECT notification.*, project.title FROM notification 
    LEFT JOIN project ON project.id = notification.description
    WHERE type_id = 1 AND user_id = ?`;
  const data = [userId];
  return sqlQuery(query, data);
}
