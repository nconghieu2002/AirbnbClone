import Header from '@/layout/Header';

function DefaultLayout({ children }) {
    return (
        <div className='p-4'>
            <Header />
            <div>{children}</div>
        </div>
    );
}

export default DefaultLayout;
