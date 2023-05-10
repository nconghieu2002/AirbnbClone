import Header from '@/layout/Header';

function DefaultLayout({ children }) {
    return (
        <div className='py-4 px-20'>
            <Header />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
