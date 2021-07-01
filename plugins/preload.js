import Vue from 'vue';
import VueLodash from 'vue-lodash'
import lodash from 'lodash'

Vue.use(VueLodash, { lodash: lodash })

import noRecordFound from '@/components/noRecordFound';
import circleLoading from '@/components/circleLoading';
import snackbar from '@/components/snackbar';
import confirmBox from '@/components/confirmBox';

import moment from 'moment';
import vueMoment from 'vue-moment';

import { v4 as uuid } from 'uuid';

window.uuid = uuid;
window.moment = moment;

Vue.use(vueMoment);
Vue.use(VueLodash, { lodash: lodash });

Vue.component('no-record-found', noRecordFound);
Vue.component('circle-loading', circleLoading);
Vue.component('snackbar', snackbar);
Vue.component('confirm-box', confirmBox);

