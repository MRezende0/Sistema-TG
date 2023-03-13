import sqlQuery from "./sqlQuery.js";

export default function sqlNotification(userId, typeId, message, description, link) {
  const query =
    "INSERT INTO notification (user_id, type_id, message, description, link) VALUES (?)";
  const data = [[userId, typeId, message, description, link]];
  return sqlQuery(query, data);
}

export function sqlListNotification(userId) {
  const query =
    "SELECT * FROM notification WHERE user_id = ?";
  const data = [userId];
  return sqlQuery(query, data);
}

export function sqlDeleteNotification(link) {
  const query =
    "DELETE FROM notification WHERE link = ?";
  const data = [link];
  return sqlQuery(query, data);
}
