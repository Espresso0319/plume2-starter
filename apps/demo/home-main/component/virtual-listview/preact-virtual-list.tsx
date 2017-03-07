
import * as React from 'react'

const STYLE_INNER = 'position:relative; overflow:hidden; width:100%; min-height:100%;';

const STYLE_CONTENT = 'position:absolute; top:0; left:0; height:100%; width:100%; overflow:visible;';

/** Virtual list, renders only visible items.
 *	@param {Array<*>} data         List of data items
 *	@param {Function} renderRow    Renders a single row
 *	@param {Number} rowHeight      Static height of a row
 *	@param {Number} overscanCount  Amount of rows to render above and below visible area of the list
 *	@param {Boolean} [sync=false]  true forces synchronous rendering
 *	@example
 *		<VirtualList
 *			data={['a', 'b', 'c']}
 *			renderRow={ row => <div>{row}</div> }
 *			rowHeight={22}
 *			sync
 *		/>
 */
interface IPorps {
    data?: Array<any>,
    [propName: string]: any;
}

export default class VirtualList extends React.Component<IPorps, any>{

    base: any;

    static defaultProps = {

    };

    getInitialState() {
        return {
            offset: 0,
            height: 0,
        };
    }

    constructor(props) {
        super();
    }

    resize = () => {

        if (this.state.height !== this.base.offsetHeight) {
            this.setState({ height: this.base.offsetHeight });
        }
    };

    handleScroll = () => {
        this.setState({ offset: this.base.scrollTop });
        if (this.props.sync) this.forceUpdate();
    };

    componentDidUpdate() {
        this.resize();
    }

    componentDidMount() {
        this.resize();
        addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        removeEventListener('resize', this.resize);
    }

    render() {
        //console.log(this.props, this.state, this);
        let { data, rowHeight, renderRow, overscanCount, sync, ...props } = this.props;
        let { offset, height } = this.state;
        // first visible row index
        let start = (offset / rowHeight) | 0;

        // actual number of visible rows (without overscan)
        let visibleRowCount = (height / rowHeight) | 0;

        // Overscan: render blocks of rows modulo an overscan row count
        // This dramatically reduces DOM writes during scrolling
        if (overscanCount) {
            start = Math.max(0, start - (start % overscanCount));
            visibleRowCount += overscanCount;
        }

        // last visible + overscan row index
        let end = start + 1 + visibleRowCount;

        // data slice currently in viewport plus overscan items
        let selection = data.slice(start, end);

        return (
            <div onScroll={this.handleScroll} {...props}>
                <div style={{ position: 'relative', overflow: 'hidden', width: '100%', minHeight: '100%', height: `${data.length * rowHeight}px` }}>
                    <div style={{ position: 'absolute', left: 0, height: '100%', width: '100%', overflow: 'visible', top: `${start * rowHeight}px` }} >
                        {selection.map(renderRow)}
                    </div>
                </div>
            </div >

        );
    }
}
