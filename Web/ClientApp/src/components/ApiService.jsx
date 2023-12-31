﻿const host = "";//"https://trr.azurewebsites.net";
export class Service {

    static getEventNotification(eventid) {
        return Service.__get(host + `/api/Common/EventNotification/${eventid}`);
    }
    static addEventNotification(notification) {
        return Service.__post(host + '/api/Common/AddNotification', notification);
    }

    static getCalendarEvents(month, year, sites) {
        return Service.__post(host + '/api/Calendar/GetMonthEvents', { month, year, sites })
    }
    static getChaptersForSelector() {
        return Service.__get(host + '/api/Chapter/GetGrouppedChapters')
    }

    static getChapterById(id) {
        return Service.__get(host + '/api/Chapter/GetById/'+id)
    }

    static saveChapter(data) {
        return Service.__post(host + '/api/Chapter/Save', data)
    }

    static deleteChapter(data) {
        return Service.__post(host + '/api/Chapter/Delete', data)
    }


    static getAllRegions() {
        return Service.__get('/api/Chapter/AllRegions');
    }
    static getRegionById(id) {
        return Service.__get(`/api/Chapter/Region/${id}`);
    }
    static saveRegion(region) {
        return Service.__post(`/api/Chapter/SaveRegion`, region);
    }
    static deleteRegion(region) {
        return Service.__post(`/api/Chapter/DeleteRegion`, region);
    }
    static getChapterMembers(id) {
        //TODO: delete
        return Service.__get('/Members.json');
    }

    static getEventTypes() {
        return Service.__get(host + '/api/Lists/getEventTypes')
    }
    static getEventsList(filter) {
        filter = filter || { from: '2019-03-01', to: '2019-04-01' };
        return Service.__post(host + '/api/Calendar/GetFilteredList', filter)
    }
    static changeEvent(event) {
        return Service.__post(host + '/api/Event/ChangeEvent', event)
    }
    static getEvent(id) {
        return Service.__get(host + '/api/Event/GetEventById/' + id)
    }
    static getEventAttendees(id) {
        return Service.__get(host + '/api/Event/GetEventAttendees/' + id)
    }
    static addEventAttendees(id, ids) {
        return Service.__post(host + '/api/Event/AddEventAttendees/' + id, ids);
    }

    static toggleAttendance(data) {
        return Service.__post(host + '/api/Event/ToggleAttendance/', data);
    }

    static removeEventAttendee(id, attendee) {
        return Service.__post(host + '/api/Event/RemoveEventAttendees/' + id, attendee)
    }
    static getSiteMembers(id) {
        return Service.__get(host + '/api/Event/GetSiteMembers/' + id)
    }
    static getSiteMembersOnly(id) {
        return Service.__get(host + '/api/Event/GetSiteMembersOnly/' + id)
    }

    static getBudget(eventId) {
        
        return Service.__get(host + '/api/Event/GetBudget/' + eventId)
    }
    static deleteBudgetLine(id, line) {
        return Service.__post(host + '/api/Event/DeleteBudgetLine/' + id, line);
    }
    static addBudgetLine(id, line) {
        return Service.__post(host + '/api/Event/AddBudgetLine/' + id, line);
    }

    static updateBudgetLine(id, line) {
        return Service.__post(host + '/api/Event/UpdateBudgetLine/' + id, line);
    }
    static getEventPictures(id) {
        return Service.__get(host + '/api/Event/GetEventPhotos/' + id);//Service.__get('/Pictures.json');//
    }
    static getProfile() {
        return Service.__get(host + '/api/Profile/Get');
    }
    static getProfileById(id) {
        return Service.__get(host + '/api/Profile/GetById/'+id);
    }

    static checkDuplicateMembers(userInfo) {
        return Service.__post(host + '/api/Profile/CheckDuplicate', userInfo);
    }

    static deleteProfile(info) {
        return Service.__post(host + '/api/Profile/Delete', info);
    }
    static setProfile(info) {
        return Service.__post(host + '/api/Profile/Set',info);
    }
    static getFilteredMembers(filter) {
        return Service.__post(host + '/api/Profile/GetFiltered', filter);
    }

    static getMembersReport() {
        return Service.__get(host + '/api/Reports/Members');
    }

    static getEventsByTypeReport(range) {
        return Service.__post(host + '/api/Reports/EventsByType', range);
    }
    static getVeteransByEventTypeReport(range) {
        return Service.__post(host + '/api/Reports/VeteransByEventType', range);
    }
    static getVeteransBySiteReport(range) {
        return Service.__post(host + '/api/Reports/VeteransBySite', range);
    }

    static getVeteransAttendence(range) {
        return Service.__post(host + '/api/Reports/VeteransAttandance', range);
    }


    static selfSignUp(id) {
        return Service.__get(host + '/api/Event/Attend/'+id);
    }
    static selfSignOff(id) {
        return Service.__get(host + '/api/Event/UnAttend/' + id);
    }

    static getOptionList() {
        return Service.__get(host + '/api/Profile/GetAllOptions');
    }
    static getUserOptions(id) {
        return Service.__get(host + '/api/Profile/getUserOptions/'+id);
    }
    static addUserOption(id, opt) {
        return Service.__post(host + '/api/Profile/addUserOption/' + id, opt);
    }
    static deleteUserOption(id, opt) {
        return Service.__post(host + '/api/Profile/deleteUserOption/' + id, opt);
    }
    static editUserOption(id, opt) {
        return Service.__post(host + '/api/Profile/editUserOption/' + id, opt);
    }
    static getDiagnosisList() {
        return Service.__get(host + '/api/Profile/GetAllDiagnosis');
    }
    static getUserDiagnosis(id) {
        return Service.__get(host + '/api/Profile/getUserDiagnosis/' + id);
    }
    static addUserDiagnose(id, d) {
        return Service.__post(host + '/api/Profile/addUserDiagnose/' + id, d);
    }
    static deleteUserDiagnosis(id, d) {
        return Service.__post(host + '/api/Profile/deleteUserDiagnosis/' + id, d);
    }
    static editUserDiagnosis(id, d) {
        return Service.__post(host + '/api/Profile/editUserDiagnosis/' + id, d);
    }

    static getTRRInfoLists() {
        return Service.__get(host + '/api/Profile/TRRInfoLists');
    }

    static throwBlob(blob, fileName) {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName ? fileName : 'sample.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    }

    static download(url) {
        return fetch(host + url).then(resp => resp.blob());
    }

    static downloadWithPost(url, data) {
        return fetch(host + url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => resp.blob());
    }

    static __get(url) {
        return fetch(url).then(response  => {
            if (response.ok) {
                const contentType = response.headers.get('Content-Type') || '';
                if (contentType.includes('application/json')) {
                    return response.json().catch(error => {
                        return Promise.reject(new Error('Invalid JSON: ' + error.message));
                    });
                }
                return Promise.reject(new Error('Invalid content type: ' + contentType));
            } else {
                if (response.status == 404) {
                    return Promise.reject(new Error('Page not found: ' + url));
                }
                return response.json().then(err => {
                    return Promise.reject(err);
                });
            }
        }).catch(error => {
            console.log(error);
            return Promise.reject(new Error(error.message));
        });
    }
    
    static __post(url, data) {
        //var promice = fetch(url, {
        //    method: 'post',
        //    body: JSON.stringify(data),
        //    headers: {
        //        'Content-Type': 'application/json'
        //    }
        //});
        //promice.catch(err => console.error(err));
        //return promice.then(data => {
        //    return data.json();
        //}).catch(err => console.error(err));


        return fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                const contentType = response.headers.get('Content-Type') || '';
                if (contentType.includes('application/json')) {
                    return response.json().catch(error => {
                        return Promise.reject(new Error('Invalid JSON: ' + error.message));
                    });
                }
                return Promise.reject(new Error('Invalid content type: ' + contentType));
            } else {
                if (response.status == 404) {
                    return Promise.reject(new Error('Page not found: ' + url));
                }
                return response.json().then(err => {
                    return Promise.reject(err);
                });
            }
        }).catch(error => {
            console.log(error);
            return Promise.reject(new Error(error.message));
        });
    }
    static uploadPictures(eventId, input) {
        let formData = new FormData();
        for (var i = 0; i < input.files.length; i++) {
            formData.append('files', input.files[i], input.files[i].name);
        }
        var promice = fetch(host + '/api/Event/UploadFile/' + eventId, { body: formData, method: 'post' });
        promice.catch(err => console.error(err));
        return promice.then(data => {
            return data.json();
        }).catch(err => console.error(err));
    }}