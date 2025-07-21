import React from "react";

const KPI: React.FC = () => {
  const kpis = {
    schools: {
      total: 200,
      active: 50,
      growth: 8,
    },
    programs: {
      total: 5000,
      active: 300,
      growth: -20,
    },
    inquiries: {
      total: 200,
      growth: 10,
    },
    faqs: {
      total: 10,
      growth: 1,
    },
    blog: {
      total: 100,
      published: 10,
      draft: 10,
      scheduled: 3,
      unpublished: 2,
      growth: 2,
    },
    staffs: {
      total: 30,
      growth: 4,
      active: 60,
    },
    students: {
      total: 200,
      paid: 20,
      active: 20,
      growth: 10,
    },
  };
  return <></>;
};
export default KPI;
