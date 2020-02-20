export function getBlockCoord(tipsets, i, id) {
  const ticketBlockIndex = tipsets.findIndex(item => {
    return item.cid === id;
  }); //ticket block index
  if (tipsets[0] && tipsets[0].cid) {
    const ticketBlock = tipsets.splice(ticketBlockIndex, 1);
    tipsets.unshift(ticketBlock[0]); //put ticket block at first
    return tipsets.map((item, index, arr) => {
      return {
        ...item,
        coord: [Number(i), (index + 1) * 5],
        blockCount: arr.length
      };
    });
  } else {
    return [
      {
        coord: [Number(i), 10]
      }
    ];
  } //null block
}
