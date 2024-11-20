export function formatPhone(phone: string) {
  const phoneNumber = phone.replace(/\D/g, '');

  const ddd = phoneNumber.slice(0, 2);
  const firstPart = phoneNumber.slice(2, 7);
  const secondPart = phoneNumber.slice(7, 11);

  return `+55 (${ddd}) ${firstPart}-${secondPart}`;
}
