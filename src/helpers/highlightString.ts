export default function highlightString(text: string, substring: string) {
  const regex = new RegExp(substring, 'gi');

  return text.replace(regex, (match) => `<strong>${match}</strong>`);
}