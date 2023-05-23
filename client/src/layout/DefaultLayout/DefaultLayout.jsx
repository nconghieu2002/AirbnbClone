import Header from '@/layout/Header';

function DefaultLayout({ children }) {
    return (
        <div className=''>
            <Header />
            <div className='mt-28 px-20'>{children}</div>
        </div>
    );
}

export default DefaultLayout;
