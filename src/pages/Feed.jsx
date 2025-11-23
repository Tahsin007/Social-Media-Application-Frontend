// src/pages/Feed.jsx
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, resetPosts } from '../redux/slices/PostSlice';
import Navbar from '../components/layout/Navbar';
import CreatePost from '../components/post/CreatePost';
import PostList from '../components/post/PostList'; // This will be used inside the new structure
// import '../index.css';
import '../../public/assets/css/bootstrap.min.css';
import '../../public/assets/css/common.css';
import '../../public/assets/css/main.css';
import '../../public/assets/css/responsive.css';
import { logout } from '../redux/slices/authSlice';

const Feed = () => {
  const dispatch = useDispatch();
  const { posts, loading, hasMore, pagination } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    // Reset and fetch initial posts
    dispatch(resetPosts());
    dispatch(fetchPosts({ page: 0, size: 10 }));
  }, [dispatch]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(fetchPosts({ page: pagination.page + 1, size: pagination.size }));
    }
  };

  const handlePostCreated = () => {
    // Refresh feed after creating post
    dispatch(resetPosts());
    dispatch(fetchPosts({ page: 0, size: 10 }));
    setShowCreatePost(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  return (
    <div className="_layout _layout_main_wrapper">
      <nav className="navbar navbar-expand-lg navbar-light _header_nav _padd_t10">
        <div className="container _custom_container">
          <div className="_logo_wrap">
            <a className="navbar-brand" href="/feed">
              <img src="/assets/images/logo.svg" alt="Image" className="_nav_logo" />
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="_header_form ms-auto">
              <form className="_header_form_grp">
                <svg className="_header_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                  <circle cx="7" cy="7" r="6" stroke="#666" />
                  <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
                </svg>
                <input className="form-control me-2 _inpt1" type="search" placeholder="input search text" aria-label="Search" />
              </form>
            </div>
            <ul className="navbar-nav mb-2 mb-lg-0 _header_nav_list ms-auto _mar_r8">
              <li className="nav-item _header_nav_item">
                <a className="nav-link _header_nav_link_active _header_nav_link" aria-current="page" href="/feed">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" fill="none" viewBox="0 0 18 21">
                    <path className="_home_active" stroke="#000" strokeWidth="1.5" strokeOpacity=".6" d="M1 9.924c0-1.552 0-2.328.314-3.01.313-.682.902-1.187 2.08-2.196l1.143-.98C6.667 1.913 7.732 1 9 1c1.268 0 2.333.913 4.463 2.738l1.142.98c1.179 1.01 1.768 1.514 2.081 2.196.314.682.314 1.458.314 3.01v4.846c0 2.155 0 3.233-.67 3.902-.669.67-1.746.67-3.901.67H5.57c-2.155 0-3.232 0-3.902-.67C1 18.002 1 16.925 1 14.77V9.924z" />
                    <path className="_home_active" stroke="#000" strokeOpacity=".6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.857 19.341v-5.857a1 1 0 00-1-1H7.143a1 1 0 00-1 1v5.857" />
                  </svg>
                </a>
              </li>
              {/* Other nav items can be added here */}
            </ul>
            <div className="_header_nav_profile">
              <div className="_header_nav_profile_image">
                <img src={user?.profilePictureUrl || "/assets/images/profile.png"} alt="Image" className="_nav_profile_img" />
              </div>
              <div className="_header_nav_dropdown" onClick={toggleProfileDropdown}>
                <p className="_header_nav_para">{user ? `${user.firstName} ${user.lastName}` : 'Guest'}</p>
                <button id="_profile_drop_show_btn" className="_header_nav_dropdown_btn _dropdown_toggle" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="6" fill="none" viewBox="0 0 10 6">
                    <path fill="#112032" d="M5 5l.354.354L5 5.707l-.354-.353L5 5zm4.354-3.646l-4 4-.708-.708 4-4 .708.708zm-4.708 4l-4-4 .708-.708 4 4-.708.708z" />
                  </svg>
                </button>
              </div>
              <div id="_prfoile_drop" className={`_nav_profile_dropdown _profile_dropdown ${isProfileDropdownOpen ? 'show' : ''}`}>
                <div className="_nav_profile_dropdown_info">
                  <div className="_nav_profile_dropdown_image">
                    <img src={user?.profilePictureUrl || "/assets/images/profile.png"} alt="Image" className="_nav_drop_img" />
                  </div>
                  <div className="_nav_profile_dropdown_info_txt">
                    <h4 className="_nav_dropdown_title">{user ? `${user.firstName} ${user.lastName}` : 'Guest'}</h4>
                    <a href="/profile" className="_nav_drop_profile">
                      View Profile
                    </a>
                  </div>
                </div>
                <hr />
                <ul className="_nav_dropdown_list">
                  {/* Other dropdown items */}
                  <li className="_nav_dropdown_list_item">
                    <a href="#" onClick={handleLogout} className="_nav_dropdown_link">
                      <div className="_nav_drop_info">
                        <span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                            <path stroke="#377DFF" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.667 18H2.889A1.889 1.889 0 011 16.111V2.89A1.889 1.889 0 012.889 1h3.778M13.277 14.222L18 9.5l-4.723-4.722M18 9.5H6.667" />
                          </svg>
                        </span>
                        Log Out
                      </div>
                      <button type="submit" className="_nav_drop_btn_link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" fill="none" viewBox="0 0 6 10">
                          <path fill="#112032" d="M5 5l.354.354L5.707 5l-.353-.354L5 5zM1.354 9.354l4-4-.708-.708-4 4 .708.708zm4-4.708l-4-4-.708.708 4 4 .708-.708z" opacity=".5" />
                        </svg>
                      </button>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="_main_layout">
        <div className="container _custom_container">
          <div className="_layout_inner_wrap">
            <div className="row">
              {/* Left Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_left_sidebar_wrap">
                  <div className="_layout_left_sidebar_inner">
                    <div className="_left_inner_area_explore _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <h4 className="_left_inner_area_explore_title _title5  _mar_b24">Explore</h4>
                      {/* Sidebar content can be made dynamic later */}
                      <ul className="_left_inner_area_explore_list">
                        <li className="_left_inner_area_explore_item _explore_item">
                          <a href="#0" className="_left_inner_area_explore_link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#666" d="M10 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S0 15.523 0 10 4.477 0 10 0zm0 1.395a8.605 8.605 0 100 17.21 8.605 8.605 0 000-17.21zm-1.233 4.65l.104.01c.188.028.443.113.668.203 1.026.398 3.033 1.746 3.8 2.563l.223.239.08.092a1.16 1.16 0 01.025 1.405c-.04.053-.086.105-.19.215l-.269.28c-.812.794-2.57 1.971-3.569 2.391-.277.117-.675.25-.865.253a1.167 1.167 0 01-1.07-.629c-.053-.104-.12-.353-.171-.586l-.051-.262c-.093-.57-.143-1.437-.142-2.347l.001-.288c.01-.858.063-1.64.157-2.147.037-.207.12-.563.167-.678.104-.25.291-.45.523-.575a1.15 1.15 0 01.58-.14zm.14 1.467l-.027.126-.034.198c-.07.483-.112 1.233-.111 2.036l.001.279c.009.737.053 1.414.123 1.841l.048.235.192-.07c.883-.372 2.636-1.56 3.23-2.2l.08-.087-.212-.218c-.711-.682-2.38-1.79-3.167-2.095l-.124-.045z" /></svg>
                            Learning
                          </a>
                          <span className="_left_inner_area_explore_link_txt">New</span>
                        </li>
                        {/* Other items */}
                        <li className="_left_inner_area_explore_item">
                          <a href="#0" className="_left_inner_area_explore_link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                              <path fill="#666" d="M14.96 2c3.101 0 5.159 2.417 5.159 5.893v8.214c0 3.476-2.058 5.893-5.16 5.893H6.989c-3.101 0-5.159-2.417-5.159-5.893V7.893C1.83 4.42 3.892 2 6.988 2h7.972zm0 1.395H6.988c-2.37 0-3.883 1.774-3.883 4.498v8.214c0 2.727 1.507 4.498 3.883 4.498h7.972c2.375 0 3.883-1.77 3.883-4.498V7.893c0-2.727-1.508-4.498-3.883-4.498zM7.036 9.63c.323 0 .59.263.633.604l.005.094v6.382c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094v-6.382c0-.385.286-.697.638-.697zm3.97-3.053c.323 0 .59.262.632.603l.006.095v9.435c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094V7.274c0-.386.286-.698.638-.698zm3.905 6.426c.323 0 .59.262.632.603l.006.094v3.01c0 .385-.285.697-.638.697-.323 0-.59-.262-.632-.603l-.006-.094v-3.01c0-.385.286-.697.638-.697z" />
                            </svg>Insights</a>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <a href="find-friends.html" className="_left_inner_area_explore_link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                              <path fill="#666" d="M9.032 14.456l.297.002c4.404.041 6.907 1.03 6.907 3.678 0 2.586-2.383 3.573-6.615 3.654l-.589.005c-4.588 0-7.203-.972-7.203-3.68 0-2.704 2.604-3.659 7.203-3.659zm0 1.5l-.308.002c-3.645.038-5.523.764-5.523 2.157 0 1.44 1.99 2.18 5.831 2.18 3.847 0 5.832-.728 5.832-2.159 0-1.44-1.99-2.18-5.832-2.18zm8.53-8.037c.347 0 .634.282.679.648l.006.102v1.255h1.185c.38 0 .686.336.686.75 0 .38-.258.694-.593.743l-.093.007h-1.185v1.255c0 .414-.307.75-.686.75-.347 0-.634-.282-.68-.648l-.005-.102-.001-1.255h-1.183c-.379 0-.686-.336-.686-.75 0-.38.258-.694.593-.743l.093-.007h1.183V8.669c0-.414.308-.75.686-.75zM9.031 2c2.698 0 4.864 2.369 4.864 5.319 0 2.95-2.166 5.318-4.864 5.318-2.697 0-4.863-2.369-4.863-5.318C4.17 4.368 6.335 2 9.032 2zm0 1.5c-1.94 0-3.491 1.697-3.491 3.819 0 2.12 1.552 3.818 3.491 3.818 1.94 0 3.492-1.697 3.492-3.818 0-2.122-1.551-3.818-3.492-3.818z" />
                            </svg>Find friends</a>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <a href="#0" className="_left_inner_area_explore_link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                              <path fill="#666" d="M13.704 2c2.8 0 4.585 1.435 4.585 4.258V20.33c0 .443-.157.867-.436 1.18-.279.313-.658.489-1.063.489a1.456 1.456 0 01-.708-.203l-5.132-3.134-5.112 3.14c-.615.36-1.361.194-1.829-.405l-.09-.126-.085-.155a1.913 1.913 0 01-.176-.786V6.434C3.658 3.5 5.404 2 8.243 2h5.46zm0 1.448h-5.46c-2.191 0-3.295.948-3.295 2.986V20.32c0 .044.01.088 0 .07l.034.063c.059.09.17.12.247.074l5.11-3.138c.38-.23.84-.23 1.222.001l5.124 3.128a.252.252 0 00.114.035.188.188 0 00.14-.064.236.236 0 00.058-.157V6.258c0-1.9-1.132-2.81-3.294-2.81zm.386 4.869c.357 0 .646.324.646.723 0 .367-.243.67-.559.718l-.087.006H7.81c-.357 0-.646-.324-.646-.723 0-.367.243-.67.558-.718l.088-.006h6.28z" />
                            </svg>Bookmarks</a>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <a href="group.html" className="_left_inner_area_explore_link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-users"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>Group</a>
                        </li>
                        <li className="_left_inner_area_explore_item _explore_item">
                          <a href="#0" className="_left_inner_area_explore_link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" fill="none" viewBox="0 0 22 24">
                              <path fill="#666" d="M7.625 2c.315-.015.642.306.645.69.003.309.234.558.515.558h.928c1.317 0 2.402 1.169 2.419 2.616v.24h2.604c2.911-.026 5.255 2.337 5.377 5.414.005.12.006.245.004.368v4.31c.062 3.108-2.21 5.704-5.064 5.773-.117.003-.228 0-.34-.005a199.325 199.325 0 01-7.516 0c-2.816.132-5.238-2.292-5.363-5.411a6.262 6.262 0 01-.004-.371V11.87c-.03-1.497.48-2.931 1.438-4.024.956-1.094 2.245-1.714 3.629-1.746a3.28 3.28 0 01.342.005l3.617-.001v-.231c-.008-.676-.522-1.23-1.147-1.23h-.93c-.973 0-1.774-.866-1.785-1.937-.003-.386.28-.701.631-.705zm-.614 5.494h-.084C5.88 7.52 4.91 7.987 4.19 8.812c-.723.823-1.107 1.904-1.084 3.045v4.34c-.002.108 0 .202.003.294.094 2.353 1.903 4.193 4.07 4.08 2.487.046 5.013.046 7.55-.001.124.006.212.007.3.004 2.147-.05 3.86-2.007 3.812-4.361V11.87a5.027 5.027 0 00-.002-.291c-.093-2.338-1.82-4.082-4.029-4.082l-.07.002H7.209a4.032 4.032 0 00-.281-.004l.084-.001zm1.292 4.091c.341 0 .623.273.667.626l.007.098-.001 1.016h.946c.372 0 .673.325.673.725 0 .366-.253.669-.582.717l-.091.006h-.946v1.017c0 .4-.3.724-.673.724-.34 0-.622-.273-.667-.626l-.006-.098v-1.017h-.945c-.372 0-.674-.324-.674-.723 0-.367.254-.67.582-.718l.092-.006h.945v-1.017c0-.4.301-.724.673-.724zm7.058 3.428c.372 0 .674.324.674.724 0 .366-.254.67-.582.717l-.091.007h-.09c-.373 0-.674-.324-.674-.724 0-.367.253-.67.582-.717l.091-.007h.09zm-1.536-3.322c.372 0 .673.324.673.724 0 .367-.253.67-.582.718l-.091.006h-.09c-.372 0-.674-.324-.674-.724 0-.366.254-.67.582-.717l.092-.007h.09z" />
                            </svg>Gaming</a> <span className="_left_inner_area_explore_link_txt">New</span>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <a href="#0" className="_left_inner_area_explore_link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path fill="#666" d="M12.616 2c.71 0 1.388.28 1.882.779.495.498.762 1.17.74 1.799l.009.147c.017.146.065.286.144.416.152.255.402.44.695.514.292.074.602.032.896-.137l.164-.082c1.23-.567 2.705-.117 3.387 1.043l.613 1.043c.017.027.03.056.043.085l.057.111a2.537 2.537 0 01-.884 3.204l-.257.159a1.102 1.102 0 00-.33.356 1.093 1.093 0 00-.117.847c.078.287.27.53.56.695l.166.105c.505.346.869.855 1.028 1.439.18.659.083 1.36-.272 1.957l-.66 1.077-.1.152c-.774 1.092-2.279 1.425-3.427.776l-.136-.069a1.19 1.19 0 00-.435-.1 1.128 1.128 0 00-1.143 1.154l-.008.171C15.12 20.971 13.985 22 12.616 22h-1.235c-1.449 0-2.623-1.15-2.622-2.525l-.008-.147a1.045 1.045 0 00-.148-.422 1.125 1.125 0 00-.688-.519c-.29-.076-.6-.035-.9.134l-.177.087a2.674 2.674 0 01-1.794.129 2.606 2.606 0 01-1.57-1.215l-.637-1.078-.085-.16a2.527 2.527 0 011.03-3.296l.104-.065c.309-.21.494-.554.494-.923 0-.401-.219-.772-.6-.989l-.156-.097a2.542 2.542 0 01-.764-3.407l.65-1.045a2.646 2.646 0 013.552-.96l.134.07c.135.06.283.093.425.094.626 0 1.137-.492 1.146-1.124l.009-.194a2.54 2.54 0 01.752-1.593A2.642 2.642 0 0111.381 2h1.235zm0 1.448h-1.235c-.302 0-.592.118-.806.328a1.091 1.091 0 00-.325.66l-.013.306C10.133 6.07 9 7.114 7.613 7.114a2.619 2.619 0 01-1.069-.244l-.192-.1a1.163 1.163 0 00-1.571.43l-.65 1.045a1.103 1.103 0 00.312 1.464l.261.162A2.556 2.556 0 015.858 12c0 .845-.424 1.634-1.156 2.13l-.156.096c-.512.29-.71.918-.472 1.412l.056.107.63 1.063c.147.262.395.454.688.536.26.072.538.052.754-.042l.109-.052a2.652 2.652 0 011.986-.261 2.591 2.591 0 011.925 2.21l.02.353c.062.563.548 1 1.14 1h1.234c.598 0 1.094-.45 1.14-1l.006-.11a2.536 2.536 0 01.766-1.823 2.65 2.65 0 011.877-.75c.35.009.695.086 1.048.241l.316.158c.496.213 1.084.058 1.382-.361l.073-.111.644-1.052a1.1 1.1 0 00-.303-1.455l-.273-.17a2.563 2.563 0 01-1.062-1.462 2.513 2.513 0 01.265-1.944c.19-.326.451-.606.792-.838l.161-.099c.512-.293.71-.921.473-1.417l-.07-.134-.013-.028-.585-.995a1.157 1.157 0 00-1.34-.513l-.111.044-.104.051a2.661 2.661 0 01-1.984.272 2.607 2.607 0 01-1.596-1.18 2.488 2.488 0 01-.342-1.021l-.014-.253a1.11 1.11 0 00-.323-.814 1.158 1.158 0 00-.823-.34zm-.613 5.284c1.842 0 3.336 1.463 3.336 3.268 0 1.805-1.494 3.268-3.336 3.268-1.842 0-3.336-1.463-3.336-3.268 0-1.805 1.494-3.268 3.336-3.268zm0 1.448c-1.026 0-1.858.815-1.858 1.82 0 1.005.832 1.82 1.858 1.82 1.026 0 1.858-.815 1.858-1.82 0-1.005-.832-1.82-1.858-1.82z" />
                            </svg>Settings</a>
                        </li>
                        <li className="_left_inner_area_explore_item">
                          <a href="#0" className="_left_inner_area_explore_link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
                            Save post</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* Suggested People & Events sections */}
                  <div className="_layout_left_sidebar_inner">
                    <div className="_left_inner_area_suggest _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_left_inner_area_suggest_content _mar_b24">
                        <h4 className="_left_inner_area_suggest_content_title _title5">Suggested People</h4>
                        <span className="_left_inner_area_suggest_content_txt">
                          <a className="_left_inner_area_suggest_content_txt_link" href="#0">See All</a>
                        </span>
                      </div>
                      <div className="_left_inner_area_suggest_info">
                        <div className="_left_inner_area_suggest_info_box">
                          <div className="_left_inner_area_suggest_info_image">
                            <a href="profile.html">
                              <img src="/assets/images/people1.png" alt="Image" className="_info_img" />
                            </a>
                          </div>
                          <div className="_left_inner_area_suggest_info_txt">
                            <a href="profile.html">
                              <h4 className="_left_inner_area_suggest_info_title">Steve Jobs</h4>
                            </a>
                            <p className="_left_inner_area_suggest_info_para">CEO of Apple</p>
                          </div>
                        </div>
                        <div className="_left_inner_area_suggest_info_link"> <a href="#0" className="_info_link">Connect</a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="_layout_left_sidebar_inner">
                    <div className="_left_inner_area_event _padd_t24  _padd_b6 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_left_inner_event_content">
                        <h4 className="_left_inner_event_title _title5">Events</h4>
                        <a href="event.html" className="_left_inner_event_link">
                          See all
                        </a>
                      </div>
                      <a className="_left_inner_event_card_link" href="event-single.html">
                        <div className="_left_inner_event_card">
                          <div className="_left_inner_event_card_iamge">
                            <img src="/assets/images/feed_event1.png" alt="Image" className="_card_img" />
                          </div>
                          <div className="_left_inner_event_card_content">
                            <div className="_left_inner_card_date">
                              <p className="_left_inner_card_date_para">10</p>
                              <p className="_left_inner_card_date_para1">Jul</p>
                            </div>
                            <div className="_left_inner_card_txt">
                              <h4 className="_left_inner_event_card_title">No more terrorism no more cry</h4>
                            </div>
                          </div>
                          <hr className="_underline" />
                          <div className="_left_inner_event_bottom">
                            <p className="_left_iner_event_bottom">17 People Going</p> <a href="#0" className="_left_iner_event_bottom_link">Going</a>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Content */}
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                <div className="_layout_middle_wrap">
                  <div className="_layout_middle_inner">
                    {/* Story Section - Desktop */}
                    <div className="_feed_inner_ppl_card _mar_b16">
                      {/* Story content from feed.html */}
                      <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col">
                          <div className="_feed_inner_profile_story _b_radious6 ">
                            <div className="_feed_inner_profile_story_image">
                              <img src="/assets/images/card_ppl1.png" alt="Image" className="_profile_story_img" />
                              <div className="_feed_inner_story_txt">
                                <div className="_feed_inner_story_btn">
                                  <button className="_feed_inner_story_btn_link">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path stroke="#fff" strokeLinecap="round" d="M.5 4.884h9M4.884 9.5v-9" /></svg>
                                  </button>
                                </div>
                                <p className="_feed_inner_story_para">Your Story</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-lg-3 col-md-4 col-sm-4 col">
                          <div className="_feed_inner_public_story _b_radious6">
                            <div className="_feed_inner_public_story_image">
                              <img src="/assets/images/card_ppl2.png" alt="Image" className="_public_story_img" />
                              <div className="_feed_inner_pulic_story_txt">
                                <p className="_feed_inner_pulic_story_para">Ryan Roslansky</p>
                              </div>
                              <div className="_feed_inner_public_mini">
                                <img src="/assets/images/mini_pic.png" alt="Image" className="_public_mini_img" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Story Section - Mobile */}
                    <div className="_feed_inner_ppl_card_mobile _mar_b16">
                      <div className="_feed_inner_ppl_card_area">
                        <ul className="_feed_inner_ppl_card_area_list">
                          <li className="_feed_inner_ppl_card_area_item">
                            <a href="#0" className="_feed_inner_ppl_card_area_link">
                              <div className="_feed_inner_ppl_card_area_story">
                                <img src="/assets/images/mobile_story_img.png" alt="Image" className="_card_story_img" />
                                <div className="_feed_inner_ppl_btn">
                                  <button className="_feed_inner_ppl_btn_link" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 12 12">
                                      <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M6 2.5v7M2.5 6h7" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <p className="_feed_inner_ppl_card_area_link_txt">Your Story</p>
                            </a>
                          </li>
                          <li className="_feed_inner_ppl_card_area_item">
                            <a href="#0" className="_feed_inner_ppl_card_area_link">
                              <div className="_feed_inner_ppl_card_area_story_active">
                                <img src="/assets/images/mobile_story_img1.png" alt="Image" className="_card_story_img1" />
                              </div>
                              <p className="_feed_inner_ppl_card_area_txt">Ryan...</p>
                            </a>
                          </li>
                          {/* More mobile stories can be added here */}
                        </ul>
                      </div>
                    </div>

                    {/* Create Post Section */}
                    <div className="_feed_inner_text_area  _b_radious6 _padd_b24 _padd_t24 _padd_r24 _padd_l24 _mar_b16">
                      {!showCreatePost ? (
                        <>
                          <div className="_feed_inner_text_area_box" onClick={() => setShowCreatePost(true)}>
                            <div className="_feed_inner_text_area_box_image">
                              <img src={user?.profilePictureUrl || "/assets/images/txt_img.png"} alt="Image" className="_txt_img" />
                            </div>
                            <div className="form-floating _feed_inner_text_area_box_form ">
                              <div className="_feed_textarea_label">
                                Write something ...
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" fill="none" viewBox="0 0 23 24">
                                  <path fill="#666" d="M19.504 19.209c.332 0 .601.289.601.646 0 .326-.226.596-.52.64l-.081.005h-6.276c-.332 0-.602-.289-.602-.645 0-.327.227-.597.52-.64l.082-.006h6.276zM13.4 4.417c1.139-1.223 2.986-1.223 4.125 0l1.182 1.268c1.14 1.223 1.14 3.205 0 4.427L9.82 19.649a2.619 2.619 0 01-1.916.85h-3.64c-.337 0-.61-.298-.6-.66l.09-3.941a3.019 3.019 0 01.794-1.982l8.852-9.5zm-.688 2.562l-7.313 7.85a1.68 1.68 0 00-.441 1.101l-.077 3.278h3.023c.356 0 .698-.133.968-.376l.098-.096 7.35-7.887-3.608-3.87zm3.962-1.65a1.633 1.633 0 00-2.423 0l-.688.737 3.606 3.87.688-.737c.631-.678.666-1.755.105-2.477l-.105-.124-1.183-1.268z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                          <div className="_feed_inner_text_area_bottom">
                            <div className="_feed_inner_text_area_item">
                              <div className="_feed_inner_text_area_bottom_photo _feed_common">
                                <button type="button" className="_feed_inner_text_area_bottom_photo_link" onClick={() => setShowCreatePost(true)}>
                                  <span className="_feed_inner_text_area_bottom_photo_iamge _mar_img">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20"><path fill="#666" d="M13.916 0c3.109 0 5.18 2.429 5.18 5.914v8.17c0 3.486-2.072 5.916-5.18 5.916H5.999C2.89 20 .827 17.572.827 14.085v-8.17C.827 2.43 2.897 0 6 0h7.917zm0 1.504H5.999c-2.321 0-3.799 1.735-3.799 4.41v8.17c0 2.68 1.472 4.412 3.799 4.412h7.917c2.328 0 3.807-1.734 3.807-4.411v-8.17c0-2.678-1.478-4.411-3.807-4.411zm.65 8.68l.12.125 1.9 2.147a.803.803 0 01-.016 1.063.642.642 0 01-.894.058l-.076-.074-1.9-2.148a.806.806 0 00-1.205-.028l-.074.087-2.04 2.717c-.722.963-2.02 1.066-2.86.26l-.111-.116-.814-.91a.562.562 0 00-.793-.07l-.075.073-1.4 1.617a.645.645 0 01-.97.029.805.805 0 01-.09-.977l.064-.086 1.4-1.617c.736-.852 1.95-.897 2.734-.137l.114.12.81.905a.587.587 0 00.861.033l.07-.078 2.04-2.718c.81-1.08 2.27-1.19 3.205-.275zM6.831 4.64c1.265 0 2.292 1.125 2.292 2.51 0 1.386-1.027 2.511-2.292 2.511S4.54 8.537 4.54 7.152c0-1.386 1.026-2.51 2.291-2.51zm0 1.504c-.507 0-.918.451-.918 1.007 0 .555.411 1.006.918 1.006.507 0 .919-.451.919-1.006 0-.556-.412-1.007-.919-1.007z" /></svg>
                                  </span>Photo
                                </button>
                              </div>
                              {/* Other icons */}
                            </div>
                            <div className="_feed_inner_text_area_btn">
                              <button type="button" className="_feed_inner_text_area_btn_link" onClick={() => setShowCreatePost(true)}>
                                <svg className="_mar_img" xmlns="http://www.w3.org/2000/svg" width="14" height="13" fill="none" viewBox="0 0 14 13"><path fill="#fff" fillRule="evenodd" d="M6.37 7.879l2.438 3.955a.335.335 0 00.34.162c.068-.01.23-.05.289-.247l3.049-10.297a.348.348 0 00-.09-.35.341.341 0 00-.34-.088L1.75 4.03a.34.34 0 00-.247.289.343.343 0 00.16.347L5.666 7.17 9.2 3.597a.5.5 0 01.712.703L6.37 7.88zM9.097 13c-.464 0-.89-.236-1.14-.641L5.372 8.165l-4.237-2.65a1.336 1.336 0 01-.622-1.331c.074-.536.441-.96.957-1.112L11.774.054a1.347 1.347 0 011.67 1.682l-3.05 10.296A1.332 1.332 0 019.098 13z" clipRule="evenodd" /></svg>
                                <span>Post</span>
                              </button>
                            </div>
                          </div>
                        </>
                      ) : (
                        <CreatePost
                          onPostCreated={handlePostCreated}
                          onCancel={() => setShowCreatePost(false)}
                        />
                      )}
                    </div>

                    {/* Post List */}
                    <PostList
                      posts={posts}
                      loading={loading}
                      hasMore={hasMore}
                      onLoadMore={handleLoadMore}
                    />
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
                <div className="_layout_right_sidebar_wrap">
                  <div className="_layout_right_sidebar_inner">
                    <div className="_right_inner_area_info _padd_t24  _padd_b24 _padd_r24 _padd_l24 _b_radious6 _feed_inner_area">
                      <div className="_right_inner_area_info_content _mar_b24">
                        <h4 className="_right_inner_area_info_content_title _title5">You Might Like</h4>
                        <span className="_right_inner_area_info_content_txt">
                          <a className="_right_inner_area_info_content_txt_link" href="#0">See All</a>
                        </span>
                      </div>
                      <hr className="_underline" />
                      <div className="_right_inner_area_info_ppl">
                        <div className="_right_inner_area_info_box">
                          <div className="_right_inner_area_info_box_image">
                            <a href="profile.html">
                              <img src="/assets/images/Avatar.png" alt="Image" className="_ppl_img" />
                            </a>
                          </div>
                          <div className="_right_inner_area_info_box_txt">
                            <a href="profile.html">
                              <h4 className="_right_inner_area_info_box_title">Radovan SkillArena</h4>
                            </a>
                            <p className="_right_inner_area_info_box_para">Founder & CEO at Trophy</p>
                          </div>
                        </div>
                        <div className="_right_info_btn_grp">
                          <button type="button" className="_right_info_btn_link">Ignore</button>
                          <button type="button" className="_right_info_btn_link _right_info_btn_link_active">Follow</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="_layout_right_sidebar_inner">
                    <div className="_feed_right_inner_area_card _padd_b6 _b_radious6 _feed_inner_area">
                      <div className="_feed_top_fixed">
                        <div className="_feed_right_inner_area_card_content _mar_b24">
                          <h4 className="_feed_right_inner_area_card_content_title _title5">Your Friends</h4>
                          <span className="_feed_right_inner_area_card_content_txt">
                            <a className="_feed_right_inner_area_card_content_txt_link" href="find-friends.html">See All</a>
                          </span>
                        </div>
                        <form className="_feed_right_inner_area_card_form">
                          <svg className="_feed_right_inner_area_card_form_svg" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="none" viewBox="0 0 17 17">
                            <circle cx="7" cy="7" r="6" stroke="#666"></circle>
                            <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3"></path>
                          </svg>
                          <input className="form-control me-2 _feed_right_inner_area_card_form_inpt" type="search" placeholder="input search text" aria-label="Search" />
                        </form>
                      </div>
                      <div className="_feed_bottom_fixed">
                        <div className="_feed_right_inner_area_card_ppl _feed_right_inner_area_card_ppl_inactive ">
                          <div className="_feed_right_inner_area_card_ppl_box">
                            <div className="_feed_right_inner_area_card_ppl_image">
                              <a href="profile.html">
                                <img src="/assets/images/people1.png" alt="" className="_box_ppl_img" />
                              </a>
                            </div>
                            <div className="_feed_right_inner_area_card_ppl_txt">
                              <a href="profile.html">
                                <h4 className="_feed_right_inner_area_card_ppl_title">Steve Jobs</h4>
                              </a>
                              <p className="_feed_right_inner_area_card_ppl_para">CEO of Apple</p>
                            </div>
                          </div>
                          <div className="_feed_right_inner_area_card_ppl_side"> <span>5 minute ago</span>
                          </div>
                        </div>
                        <div className="_feed_right_inner_area_card_ppl">
                          <div className="_feed_right_inner_area_card_ppl_box">
                            <div className="_feed_right_inner_area_card_ppl_image">
                              <a href="profile.html">
                                <img src="/assets/images/people2.png" alt="" className="_box_ppl_img" />
                              </a>
                            </div>
                            <div className="_feed_right_inner_area_card_ppl_txt">
                              <a href="profile.html">
                                <h4 className="_feed_right_inner_area_card_ppl_title">Ryan Roslansky</h4>
                              </a>
                              <p className="_feed_right_inner_area_card_ppl_para">CEO of Linkedin</p>
                            </div>
                          </div>
                          <div className="_feed_right_inner_area_card_ppl_side">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                              <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
                            </svg>
                          </div>
                        </div>
                        <div className="_feed_right_inner_area_card_ppl">
                          <div className="_feed_right_inner_area_card_ppl_box">
                            <div className="_feed_right_inner_area_card_ppl_image">
                              <a href="profile.html">
                                <img src="/assets/images/people3.png" alt="" className="_box_ppl_img" />
                              </a>
                            </div>
                            <div className="_feed_right_inner_area_card_ppl_txt">
                              <a href="profile.html">
                                <h4 className="_feed_right_inner_area_card_ppl_title">Dylan Field</h4>
                              </a>
                              <p className="_feed_right_inner_area_card_ppl_para">CEO of Figma</p>
                            </div>
                          </div>
                          <div className="_feed_right_inner_area_card_ppl_side">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                              <rect width="12" height="12" x="1" y="1" fill="#0ACF83" stroke="#fff" strokeWidth="2" rx="6" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;