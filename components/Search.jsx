import React, { useEffect, useRef, useState } from 'react';
import useDebounce from '@/lib/useDebounce';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BsSearch, BsXCircle } from 'react-icons/bs';

export default function Search() {
  const [query, setQuery] = useState('');
  const [queryList, setQueryList] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [selectLocation, setSelectLocation] = useState('Select Location...');

  const debounceSearch = useDebounce(query, 500);
  const resultContainer = useRef(null);
  const router = useRouter();

  // ==========================================================================
  // ==========<<< Update Query Input >>>======================================
  // ==========================================================================
  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);
    if (value.length < 1) {
      setNotFound(false);
      setQueryList([]);
    }
  };

  // ==========================================================================
  // ==========<<< Handle Clear Input >>>======================================
  // ==========================================================================
  const handleClear = () => {
    setQuery('');
    setFocusedIndex(-1);
    setSelectLocation('Select Location...');
  };

  // ==========================================================================
  // ==========<<< Handle Click >>>============================================
  // ==========================================================================
  const handleClick = () => {
    if (!resultContainer.current) return;
    setQuery('');
    setFocusedIndex(-1);
    setSelectLocation('Select Location...');
    router.push(resultContainer.current.firstChild.getAttribute('href'));
  };

  // ==========================================================================
  // ==========<<< FETCH Location Results >>>==================================
  // ==========================================================================
  useEffect(() => {
    const getLocations = async () => {
      // Prevent illegal query searches:
      if (/[!@#$%^&*()+={}\[\]?<>\/\\?]/g.test(debounceSearch)) {
        setNotFound(true);
        return;
      } else {
        setNotFound(false);
      }
      if (debounceSearch.length < 1) {
        setQueryList([]);
        return;
      } else {
        if (debounceSearch.trim().length > 1) {
          const res = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${debounceSearch}&count=50`
          );
          const { results } = await res.json();
          console.log('Locations', results);
          if (!results) {
            setQueryList([]);
            setNotFound(true);
            return;
          }
          setQueryList(results);
        }
      }
    };
    getLocations();
  }, [debounceSearch]);

  // ==========================================================================
  // ==========<<< Keep Highlighted Selection Centered >>>=====================
  // ==========================================================================
  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.scrollIntoView({ block: 'center' });
    setSelectLocation(resultContainer.current.textContent);
    console.log(
      'resultContainer.current',
      resultContainer.current,
      'tabIndex',
      resultContainer.current.tabIndex
    );
  }, [focusedIndex]);

  // ==========================================================================
  // ==========<<< Handle Keyboard Navigation >>>==============================
  // ==========================================================================
  const handleKeyDown = (event) => {
    const { key } = event;
    let nextIndexCount = -1;

    if (key === 'ArrowDown')
      nextIndexCount = (focusedIndex + 1) % queryList.length;

    if (key === 'ArrowUp')
      nextIndexCount = (focusedIndex + queryList.length - 1) % queryList.length;

    if (key === 'Escape') setQuery('');

    if (key === 'Enter') {
      !resultContainer.current
        ? setNotFound(true)
        : router.push(resultContainer.current.firstChild.getAttribute('href'));
      setQuery('');
    }
    console.log(
      'nextIndexCount',
      nextIndexCount,
      'queryList.length',
      queryList.length
    );
    setFocusedIndex(nextIndexCount);
  };

  return (
    <>
      {/* ==========================================================================
          ===============<<< Blurred Search Overlay >>>=============================
          ========================================================================== */}
      {query ? (
        <div className='absolute inset-0 z-10 bg-neutral-900/30 backdrop-blur-md' />
      ) : null}

      {/* ==========================================================================
          ===============<<< Search Query >>>=======================================
          ========================================================================== */}
      <div className='flex w-full justify-center p-3'>
        <div className='relative w-full max-w-2xl'>
          <div className='relative z-50' onKeyDown={handleKeyDown}>
            <input
              type='text'
              value={query}
              placeholder='Search for a location...'
              onChange={onChange}
              className='w-full max-w-2xl rounded-lg border border-gray-300 bg-transparent px-4 py-2 pr-12 text-xl text-gray-50 placeholder-gray-300 outline-none'
            />
            <button className='absolute right-3.5 top-3.5 text-white'>
              {!query ? (
                <BsSearch size={20} />
              ) : (
                <BsXCircle size={20} onClick={handleClear} />
              )}
            </button>
            {/* ======================================================================
                ===============<<< Display Select Location... >>>=====================
                ====================================================================== */}
            {queryList.length && !notFound ? (
              <div
                onClick={handleClick}
                className='z-0 my-1 flex cursor-pointer items-center rounded-md border bg-gray-500/40 px-6 py-2 pl-7 text-lg  font-medium text-orange-400 backdrop-blur-sm'
              >
                {selectLocation}
              </div>
            ) : null}

            {/* =====================================================================
                ===============<<< Display Query Locations >>>=======================
                ===================================================================== */}
            {queryList.length && !notFound ? (
              <div
                tabIndex={-1}
                className='h-56 w-full space-y-1 overflow-y-auto rounded-md bg-transparent text-white scrollbar-hide'
              >
                {queryList.map((city, index) => (
                  <li
                    key={city.id}
                    value={`${city.name}, ${city.admin1}`}
                    tabIndex={focusedIndex}
                    ref={index === focusedIndex ? resultContainer : null}
                    style={{
                      backgroundColor:
                        index === focusedIndex
                          ? 'rgba(169, 171, 175, 0.3)'
                          : '',
                      borderStyle: index === focusedIndex ? 'solid' : '',
                      borderWidth: index === focusedIndex ? '1px' : '',
                    }}
                    className='flex w-full rounded-md bg-cyan-100/20 shadow-md backdrop-blur-md focus-within:bg-gray-200/50 focus-within:outline-none focus-within:backdrop-blur-md hover:bg-gray-200/20 hover:backdrop-blur-md'
                  >
                    <Link
                      href={`/location/${city.name}&${city.country_code}&${city.latitude}&${city.longitude}`}
                      onClick={() => setQuery('')}
                      className='w-full cursor-pointer focus:outline-none'
                    >
                      <div className='h-10 w-full p-2 px-8'>
                        {city.name}, {city.admin1 ? `${city.admin1}, ` : ''}
                        {city.country ? city.country : city.country_code}
                      </div>
                    </Link>
                  </li>
                ))}
              </div>
            ) : null}
            {/* =====================================================================
                ===============<<< Display Location Not Found >>>====================
                ===================================================================== */}
            {notFound && (
              <div className='mt-1 rounded-md border border-gray-50 bg-gray-600/30 px-6 py-2 text-lg text-orange-400 backdrop-blur-sm'>
                Location not found
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
