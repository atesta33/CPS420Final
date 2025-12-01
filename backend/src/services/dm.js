export function getDMRoom(userA, userB) {
  const ids = [String(userA), String(userB)].sort()
  return `dm_${ids[0]}_${ids[1]}`
}