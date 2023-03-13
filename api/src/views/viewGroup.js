export default {
  render(group) {
    return {
      presentation: group.presentation,
      leader: group.leader,
      id: group.id,
      leader_id: group.leader_id,
      term_id: group.term_id,
      theme_id: group.theme_id,
      title: group.title,
      advisor_id: group.advisor_id,
      co_advisor_id: group.co_advisor_id,
      created_at: group.created_at,
      advisor: group.advisor,
      course: group.course
    };
  },
  renderMany(groups) {
    return groups.map((group) => this.render(group));
  },
};
