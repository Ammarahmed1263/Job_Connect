const getStringInitials = (fullName: string) => {
  const names = fullName.split(" ");
  return names.length >= 2
    ? `${names[0][0]}${names[1][0]}`.toUpperCase()
    : fullName.slice(0, 2).toUpperCase();
};

export default getStringInitials;