/**
 * Оценки за контрольные точки. Значение: '2', '3', '4', '5', 'н', 'п', 'з/с' или ''.
 * Редактируются преподавателем в этом файле при публикации сайта.
 * Ключи групп и учеников берутся из groups.map.js.
 *
 * Пример (удалите // для применения):
 * '1WEB-26': {
 *   '1web-student-01': { 'А1': '5', 'А2': '4', 'I': '5', 'II': '', 'Итог': '' },
 * },
 *
 * Не заполненная ячейка всегда показывается как «—».
 */
export const controlGradesByGroup = {
  '1WEB-26': {},
  '2WEB-25': {},
}

export function getControlGrade(groupId, studentId, column) {
  return controlGradesByGroup[groupId]?.[studentId]?.[column] ?? ''
}
