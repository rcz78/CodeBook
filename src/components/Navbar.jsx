import { Menu } from 'primereact/menu';

import Profile from './Profile';

import { useNavigate } from 'react-router-dom';

export default function Navbar() {

  const navigate = useNavigate();

  // TODO: click handlers?
  let items = [
    { label: 'All', icon: 'pi pi-fw pi-list', command: () => { navigate('/all') } },
    { label: 'Recent', icon: 'pi pi-fw pi-clock' },
    { label: 'Shared', icon: 'pi pi-fw pi-share-alt' },
  ];

  return (
    <div className="navbar-container">
      <div className="navbar-menu">
        <Menu model={items} />
      </div>
      <div className="navbar-profile">
        <Profile />
      </div>
    </div>
  )
}
