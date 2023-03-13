export default {
  render(stand) {
    return {
      project: stand.project,
      course: stand.course,
      leader: stand.leader,
      theme: stand.theme,
      id: stand.id,
      project_id: stand.project_id,
      presentation: stand.presentation,
      teacher1: stand.user1,
      teacher2: stand.user2,
      teacher3: stand.user3,
    };
  },
  renderMany(stands) {
    return stands.map((stand) => this.render(stand));
  },
};
