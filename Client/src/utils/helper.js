export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getInitials = (title) => {
  if(!title) return "";
  const words = title.split(" ");
  let initials = "";
  for (let i = 0; i < words.length; i++) {
    if (words[i] && words[i].length > 0) {
      initials += words[i][0].toUpperCase();
    }
  }
  return initials.toUpperCase();
}

// Generate random avatar URL using DiceBear API
export const generateAvatarUrl = (email) => {
  // Using DiceBear's API with the email as seed to ensure consistency
  // This will generate a unique avatar for each email
  const avatarStyles = ['avataaars', 'big-ears', 'big-smile', 'croodles', 'identicon', 'lorelei', 'micah', 'miniavs', 'personas'];
  const randomStyle = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${encodeURIComponent(email)}`;
};