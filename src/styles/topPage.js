const drawerWidth = 300;

export const styles = theme => ({
  root: {
    width: '100%',
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: '#615dff'
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  drawerList: {
    overflowY: 'scroll',
    height: '100vh',
    paddingTop: 2,
  },
  drawerHeader: theme.mixins.toolbar,
  drawerPaper: {
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      position: 'relative',
      height: '100%',
    },
  },
  drawerItem: {
    focused: {
      backgroundColor: '#f3d8cc',
    },
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
  card: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 1,
    cursor: 'pointer',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: 'calc(300px - 70px)',
    padding: 5,
    fontSize: 15,
  },
  cardContent: {
    flex: '1 0 auto',
  },
  cover: {
    width: 80,
    height: 80,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  playIcon: {
    height: 38,
    width: 38,
  },
});