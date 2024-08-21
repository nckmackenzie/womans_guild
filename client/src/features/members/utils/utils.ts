export function memberNoFormatter(memberNo: number) {
  return `SP/WG/${memberNo.toString().padStart(4, '0')}`;
}
