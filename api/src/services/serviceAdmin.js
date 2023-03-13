import sqlQuery from "../plugins/sqlQuery.js";

export function deleteStand(bancaId) {
  const query = "DELETE FROM stand WHERE id = ?";
  const data = [bancaId];
  return sqlQuery(query, data);
}

export function invitation(email) {
  const query = "INSERT INTO invitations (email) VALUES (?)";
  const data = [[email]];
  return sqlQuery(query, data);
}

export function createStand(
  groupId,
  presentation,
  teacher1,
  teacher2,
  teacher3
) {
  const query =
    "INSERT INTO stand (project_id, presentation, teacher_1, teacher_2, teacher_3) VALUES (?)";
  const data = [[groupId, presentation, teacher1, teacher2, teacher3]];
  return sqlQuery(query, data);
}

export function updateStand(
  groupId,
  presentation,
  teacher1,
  teacher2,
  teacher3,
  id
) {
  const query =
    "UPDATE stand SET project_id = ?, presentation = ?, teacher_1 = ?, teacher_2 = ?, teacher_3 = ? WHERE id = ?";
  const data = [groupId, presentation, teacher1, teacher2, teacher3, id];
  return sqlQuery(query, data);
}

export function list() {
  const query = 
    `SELECT ua.name as leader, c.title as course, t.title as theme, s.*, u1.name as user1, u2.name as user2, u3.name as user3 
    FROM stand as s 
    LEFT JOIN user as u1 ON u1.id = s.teacher_1
    LEFT JOIN user as u2 ON u2.id = s.teacher_2
    LEFT JOIN user as u3 ON u3.id = s.teacher_3
    INNER JOIN project as p ON p.id = s.project_id
    INNER JOIN theme as t on t.id = p.theme_id
    INNER JOIN user as ua ON ua.id = p.leader_id
    INNER JOIN course as c ON c.id = ua.course_id`;
  const data = [];
  return sqlQuery(query, data);
}


export function listById(id) {
  const query = 
    `SELECT p.title as project, ua.name as leader, c.title as course, t.title as theme, s.*, u1.name as user1, u2.name as user2, u3.name as user3 
    FROM stand as s 
    LEFT JOIN user as u1 ON u1.id = s.teacher_1
    LEFT JOIN user as u2 ON u2.id = s.teacher_2
    LEFT JOIN user as u3 ON u3.id = s.teacher_3
    INNER JOIN project as p ON p.id = s.project_id
    INNER JOIN theme as t on t.id = p.theme_id
    INNER JOIN user as ua ON ua.id = p.leader_id
    INNER JOIN course as c ON c.id = ua.course_id
    WHERE p.id = ?`;
  const data = [id];
  return sqlQuery(query, data);
}