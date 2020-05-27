export function getEnglishDate(date) {
    const arrDate = date.split("-");

    const month_english_list = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.']

    var month = Number(arrDate[1]);
    var month_english = month_english_list[month - 1];
    var day = arrDate[2];
    var year = arrDate[0];

    return month_english + " " + day + ", " + year;
}