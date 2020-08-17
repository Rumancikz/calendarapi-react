import moment from 'moment';

export function militaryToStandard(milTime) {
    console.log(
        moment(milTime, 'YYYY-MM-DDTHH:mm').format('YYYY-MM-DDThh:mm a')
        )
}
export function isoToNorm(nonFormatTime) {
    var unchangedDate = moment(nonFormatTime)
    var changedDate = unchangedDate.utc().format('MMMM DD, YYYY hh:mm a')
    return changedDate
}
