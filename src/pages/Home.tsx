import React, { useEffect, useState } from 'react';
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';
import { getAssets } from '../../lib/api';
import { Asset, PaginateOnClick } from '../interfaces';

enum PaginationDefaults {
  ITEMS_PER_PAGE = 15
}

const Home: React.FC = () => {
  const [itemOffset, setItemOffset] = useState(0);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [paginatedAssets, setPaginatedAssets] = useState<Asset[]>([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await getAssets();
      const assetsArray = Object.entries(data).map(([address, asset], index) => ({
        index: index + 1,
        address,
        name: asset.name,
        symbol: asset.symbol,
        lastPrice: asset.last_price,
        makerFee: asset.maker_fee,
        takerFee: asset.taker_fee,
      }));
      
      setAssets(assetsArray);
      const count = Math.ceil(assetsArray.length / PaginationDefaults.ITEMS_PER_PAGE);
      setPageCount(count);
      setLoading(false);
    };

    getData();
  }, [])

  useEffect(() => {
    const endOffset = itemOffset + PaginationDefaults.ITEMS_PER_PAGE;
    const currentItems = assets.slice(itemOffset, endOffset);
    
    setPaginatedAssets(currentItems);
  }, [itemOffset, assets]);

  const handlePageClick = (event: PaginateOnClick) => {
    const newOffset = (event.selected * PaginationDefaults.ITEMS_PER_PAGE) % assets.length;
    setItemOffset(newOffset);
  };

  return (
    <section className="py-12 flex flex-col items-center justify-center min-h-[1000px]">
      {
        loading ? <Spinner /> : (
          <>
            <table className="w-8/12 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-4">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">#</th>
                  <th className="px-6 py-3">Coin</th>
                  <th className="px-6 py-3"></th>
                  <th className="px-6 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {
                  paginatedAssets.length > 0 && paginatedAssets.map((asset: Asset) => 
                    <tr key={asset.address} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <td className="px-6 py-3">{asset.index}</td>
                      <td className="px-6 py-3 flex">
                        <img
                          src={`/icons/${asset.symbol}.svg`}
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = `/icons/NOT.svg`;
                          }}
                          alt={`${asset.symbol} icon`}
                          className="w-8 h-8 mr-2"
                        />
                        <span className="my-auto">
                          {asset.name}
                        </span>
                      </td>
                      <td className="px-6 py-3">{asset.symbol}</td>
                      <td className="px-6 py-3">${asset.lastPrice.toLocaleString()}</td>
                    </tr>
                  )
                }
                </tbody>
            </table>
            <Pagination pageCount={pageCount} onClick={handlePageClick} />
          </>
        )
      }
    </section>
  )
}

export default Home;
