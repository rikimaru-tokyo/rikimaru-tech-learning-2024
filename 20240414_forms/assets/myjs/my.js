// cf.https://note.com/dctm/n/n45af36a98d2c
// cf.https://developer.a-blogcms.jp/document/reference/builtinjs/control/date-picker.html
// https://tr.you84815.space/flatpickr/examples.html

const cls_datepickr_conf = {
    locale: 'ja',
    minDate: "1990-01-01",
    maxDate: "2036-12-31",
    enableTime: false,
    dateFormat: "Y/m/d",
    wrap: true
};

const cls_timepickr_conf = {
    locale: 'ja',
    noCalendar: true,
    enableTime: true,
    dateFormat: "H:i",
    hourIncrement: 1,
    munuteIncrement: 1,
    time_24hr: true,
    wrap: true
};


flatpickr(".flatpickr", cls_datepickr_conf);
flatpickr(".timepickr", cls_timepickr_conf);

// cf. https://tr.you84815.space/flatpickr/theFlatpickrInstance.html
// https://alllearnhobby.com/archives/2312.html
document.getElementById("cal_icon").addEventListener('click', function (e) {
    e.stopPropagation();
    console.log(!!(document.getElementsByClassName('flatpickr-calendar')[1].style.display != ""));
}, false);

document.getElementById("time_icon").addEventListener('click', function (e) {
    e.stopPropagation();
}, false);


// バブリング と キャプチャリング
// https://ja.javascript.info/bubbling-and-capturing#ref-1700
