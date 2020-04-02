import React from "react";
import routes from "../routes";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import M from "@material-ui/core/Menu";
import MItem from "@material-ui/core/MenuItem";
import ProfileBox from "../components/ProfileBox";

const Menu = () => {
  const [anchorElMM01, setAnchorElMM01] = React.useState(null);
  const [anchorElMM02, setAnchorElMM02] = React.useState(null);
  const [anchorElMM03, setAnchorElMM03] = React.useState(null);
  const [anchorElMM04, setAnchorElMM04] = React.useState(null);
  const [anchorElMM05, setAnchorElMM05] = React.useState(null);
  const [anchorElMM06, setAnchorElMM06] = React.useState(null);
  const [anchorElMM07, setAnchorElMM07] = React.useState(null);

  // MM01
  const handleClickMM01 = event => {
    setAnchorElMM01(event.currentTarget);
  };

  const handleCloseMM01 = () => {
    setAnchorElMM01(null);
  };

  // MM02
  const handleClickMM02 = event => {
    setAnchorElMM02(event.currentTarget);
  };

  const handleCloseMM02 = () => {
    setAnchorElMM02(null);
  };

  // MM03
  const handleClickMM03 = event => {
    setAnchorElMM03(event.currentTarget);
  };

  const handleCloseMM03 = () => {
    setAnchorElMM03(null);
  };

  // MM04
  const handleClickMM04 = event => {
    setAnchorElMM04(event.currentTarget);
  };

  const handleCloseMM04 = () => {
    setAnchorElMM04(null);
  };

  // MM05
  const handleClickMM05 = event => {
    setAnchorElMM05(event.currentTarget);
  };

  const handleCloseMM05 = () => {
    setAnchorElMM05(null);
  };

  // MM06
  const handleClickMM06 = event => {
    setAnchorElMM06(event.currentTarget);
  };

  const handleCloseMM06 = () => {
    setAnchorElMM06(null);
  };

  // MM07
  const handleClickMM07 = event => {
    setAnchorElMM07(event.currentTarget);
  };

  const handleCloseMM07 = () => {
    setAnchorElMM07(null);
  };

  return (
    <>
      <ProfileBox />
      <div className="menu_list">
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMM01}
        >
          인사 관리
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorElMM01}
          keepMounted
          open={Boolean(anchorElMM01)}
          onClose={handleCloseMM01}
        >
          <MItem onClick={handleCloseMM01}>
            <NavLink to={routes.MM0101}>출퇴근 관리</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM01}>
            <NavLink to={routes.MM0102}>연차 관리</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM01}>
            <NavLink to={routes.MM0103}>직원 정보</NavLink>
          </MItem>
        </M>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMM02}
        >
          프로젝트 관리
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorElMM02}
          keepMounted
          open={Boolean(anchorElMM02)}
          onClose={handleCloseMM02}
        >
          <MItem onClick={handleCloseMM02}>
            <NavLink to={routes.MM0201}>예정 프로젝트</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM02}>
            <NavLink to={routes.MM0202}>진행 프로젝트</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM02}>
            <NavLink to={routes.MM0203}>완료 프로젝트</NavLink>
          </MItem>
        </M>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMM03}
        >
          유지보수 관리
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorElMM03}
          keepMounted
          open={Boolean(anchorElMM03)}
          onClose={handleCloseMM03}
        >
          <MItem onClick={handleCloseMM03}>
            <NavLink to={routes.MM0301}>유지보수 플랜</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM03}>
            <NavLink to={routes.MM0302}>유지보수 내역</NavLink>
          </MItem>
        </M>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMM04}
        >
          커뮤니티
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorElMM04}
          keepMounted
          open={Boolean(anchorElMM04)}
          onClose={handleCloseMM04}
        >
          <MItem onClick={handleCloseMM04}>
            <NavLink to={routes.MM0401}>공지사항</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM04}>
            <NavLink to={routes.MM0402}>사내일정</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM04}>
            <NavLink to={routes.MM0403}>자유게시판</NavLink>
          </MItem>
        </M>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMM05}
        >
          수익 관리
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorElMM05}
          keepMounted
          open={Boolean(anchorElMM05)}
          onClose={handleCloseMM05}
        >
          <MItem onClick={handleCloseMM05}>
            <NavLink to={routes.MM0501}>프로젝트 수익</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM05}>
            <NavLink to={routes.MM0502}>유지보수 수익</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM05}>
            <NavLink to={routes.MM0503}>총 결산 수익</NavLink>
          </MItem>
        </M>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMM06}
        >
          서버/개발 관리
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorElMM06}
          keepMounted
          open={Boolean(anchorElMM06)}
          onClose={handleCloseMM06}
        >
          <MItem onClick={handleCloseMM06}>
            <NavLink to={routes.MM0601}>서버 관리</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM06}>
            <NavLink to={routes.MM0602}>도메인 관리</NavLink>
          </MItem>

          <MItem onClick={handleCloseMM06}>
            <NavLink to={routes.MM0603}>총 비용 관리</NavLink>
          </MItem>
        </M>

        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClickMM07}
        >
          클라이언트 관리
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorElMM07}
          keepMounted
          open={Boolean(anchorElMM07)}
          onClose={handleCloseMM07}
        >
          <MItem onClick={handleCloseMM07}>
            <NavLink to={routes.MM0701}>클라이언트 리스트</NavLink>
          </MItem>
        </M>
      </div>
    </>
  );
};

export default Menu;
