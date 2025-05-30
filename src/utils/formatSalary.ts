const formatSalary = (salary: number) => {
  if (typeof salary !== 'number') return 0;

  const inThousands = salary >= 1000 ? salary / 1000 : salary;
  return Math.round(inThousands * 10) / 10;
}

export default formatSalary;