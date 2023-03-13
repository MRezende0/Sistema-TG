import sqlQuery from "../plugins/sqlQuery.js";

export function searchById(id) {
  const query =
    "SELECT user.*, course.title as course FROM user LEFT JOIN course ON course.id = user.course_id WHERE user.id = ? ";
  const data = [id];
  return sqlQuery(query, data);
}

export function searchByEmail(email) {
  const query = "SELECT * FROM user WHERE email = ?";
  const data = [email];
  return sqlQuery(query, data);
}

export function searchByType(type) {
  let query;
  if (type !== "all") {
    query =
      "SELECT user.*, course.title as course FROM user LEFT JOIN course ON course.id = user.course_id WHERE type = ?";
  } else {
    query =
      "SELECT user.*, course.title as course FROM user LEFT JOIN course ON course.id = user.course_id";
  }
  const data = [type];
  return sqlQuery(query, data);
}

export function searchInvitation(md5) {
  const query = "SELECT * FROM invitations WHERE MD5(email) = ?";
  const data = [md5];
  return sqlQuery(query, data);
}

export function themes() {
  const query = "SELECT * FROM theme";
  const data = [];
  return sqlQuery(query, data);
}

export function remove(id) {
  const preQuery = "SET foreign_key_checks = 0";
  sqlQuery(preQuery, []);
  const query = `DELETE FROM user WHERE id = ?`;
  const data = [id];
  return sqlQuery(query, data);
}

export function add(name, email, password, phone, course_id, type) {
  const query = `INSERT INTO user (name, email, password, phone, course_id, type) VALUES (?)`;
  const data = [[name, email, password, phone, course_id, type]];
  return sqlQuery(query, data);
}
