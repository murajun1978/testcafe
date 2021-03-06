import { transport } from '../deps/hammerhead';
import { delay } from '../deps/testcafe-core';
import { hide as hideUI, show as showUI } from '../deps/testcafe-ui';
import MESSAGE from '../../../test-run/client-messages';
import DriverStatus from '../status';


const POSSIBLE_RESIZE_ERROR_DELAY = 100;

export default function prepareBrowserManipulation () {
    var result = null;

    var message = {
        cmd:              MESSAGE.readyForBrowserManipulation,
        innerWidth:       window.innerWidth,
        innerHeight:      window.innerHeight,
        disableResending: true
    };

    hideUI();

    return transport
        .queuedAsyncServiceMsg(message)
        .then(res => {
            result = res;

            showUI();

            return delay(POSSIBLE_RESIZE_ERROR_DELAY);
        })
        .then(() => new DriverStatus({ isCommandResult: true, result }));
}
