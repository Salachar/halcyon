import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BuildIcon from '@mui/icons-material/Build';
import BusinessIcon from '@mui/icons-material/Business';
import CasinoIcon from '@mui/icons-material/Casino';
import CodeIcon from '@mui/icons-material/Code';
import DiamondIcon from '@mui/icons-material/Diamond';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LockIcon from '@mui/icons-material/Lock';
import MapIcon from '@mui/icons-material/Map';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import ScienceIcon from '@mui/icons-material/Science';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorefrontIcon from '@mui/icons-material/Storefront';
import VideocamIcon from '@mui/icons-material/Videocam';
import CampaignIcon from '@mui/icons-material/Campaign';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GavelIcon from '@mui/icons-material/Gavel';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Nightlife from '@mui/icons-material/Nightlife';
import Taxi from '@mui/icons-material/LocalTaxi';
import Traffic from '@mui/icons-material/Traffic';
import Trophy from '@mui/icons-material/EmojiEvents';
import Vaccines from '@mui/icons-material/Vaccines';
import Warehouse from '@mui/icons-material/Warehouse';
import Hotel from '@mui/icons-material/Hotel';
import LAN from '@mui/icons-material/Lan';
import ATM from '@mui/icons-material/LocalAtm';
import Food from '@mui/icons-material/RestaurantMenu';
import Time from '@mui/icons-material/AccessTime';
import Entertainment from '@mui/icons-material/TheaterComedy';
import Vending from '@mui/icons-material/LocalDrink';
import Maintenance from '@mui/icons-material/BuildCircle';
import Briefing from '@mui/icons-material/Assignment';
import Bounty from '@mui/icons-material/AssignmentInd';
import CoffeeMachine from '@mui/icons-material/CoffeeMaker';
import Radio from '@mui/icons-material/Radio';
import VideoGame from '@mui/icons-material/VideogameAsset';
import Hours from '@mui/icons-material/AccessTime';
import Deals from '@mui/icons-material/LocalOffer';
import Inventory from '@mui/icons-material/Inventory';
import Lock from '@mui/icons-material/Lock';
import Person from '@mui/icons-material/Person';
import Bulletin from '@mui/icons-material/FormatListBulleted';
import Debug from '@mui/icons-material/SettingsEthernet';
import Files from '@mui/icons-material/BackupTable';
import Security from '@mui/icons-material/Security';
import Query from '@mui/icons-material/QueryStats';
import Schedule from '@mui/icons-material/EventNote';
import Computer from '@mui/icons-material/Computer';
import BarMenu from '@mui/icons-material/Tapas';
import News from '@mui/icons-material/Newspaper';
import Cloud from '@mui/icons-material/Cloud';
import Rugby from '@mui/icons-material/SportsRugby';
import Tips from '@mui/icons-material/TipsAndUpdates';
import Heart from '@mui/icons-material/Favorite';
import Stars from '@mui/icons-material/AutoAwesome';
import House from '@mui/icons-material/House';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GroupsIcon from '@mui/icons-material/Groups';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import StorageIcon from '@mui/icons-material/Storage';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import DeckIcon from '@mui/icons-material/Deck';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import KitchenIcon from '@mui/icons-material/Kitchen';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import HelpIcon from '@mui/icons-material/Help';
import ChurchIcon from '@mui/icons-material/Church';
import FactoryIcon from '@mui/icons-material/Factory';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import ConstructionIcon from '@mui/icons-material/Construction';
import ShieldIcon from '@mui/icons-material/Shield';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import RamenDiningIcon from '@mui/icons-material/RamenDining';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import PlumbingIcon from '@mui/icons-material/Plumbing';
import DeleteIcon from '@mui/icons-material/Delete';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import BackupIcon from '@mui/icons-material/Backup';

const TEAL = { fontSize: 20, color: 'rgb(79, 209, 197)' };
const YELLOW = { fontSize: 20, color: 'rgb(251, 191, 36)' };
const RED = { fontSize: 20, color: 'rgb(252, 129, 129)' };
const SLATE = { fontSize: 20, color: 'rgb(148, 163, 184)' };

const Icons = {
  Backup: () => <BackupIcon style={TEAL} />,
  CarRepair: () => <CarRepairIcon style={TEAL} />,
  Trash: () => <DeleteIcon style={TEAL} />,
  Wrench: () => <PlumbingIcon style={TEAL} />,
  Fuel: () => <LocalGasStationIcon style={TEAL} />,
  Noodles: () => <RamenDiningIcon style={TEAL} />,
  Hub: () => <DeviceHubIcon style={TEAL} />,
  Drugs: () => <Vaccines style={TEAL} />,
  Shield: () => <ShieldIcon style={TEAL} />,
  Weapons: () => <ConstructionIcon style={TEAL} />,
  Water: () => <WaterDropIcon style={TEAL} />,
  Factory: () => <FactoryIcon style={TEAL} />,
  Church: () => <ChurchIcon style={TEAL} />,
  Help: () => <HelpIcon style={TEAL} />,
  Furniture: () => <TableRestaurantIcon style={TEAL} />,
  Fridge: () => <KitchenIcon style={TEAL} />,
  Devices: () => <DevicesOtherIcon style={TEAL} />,
  Deck: () => <DeckIcon style={TEAL} />,
  GoldDeck: () => <DeckIcon style={TEAL} />,
  Room: () => <MeetingRoomIcon style={TEAL} />,
  Fitness: () => <FitnessCenterIcon style={TEAL} />,
  Database: () => <StorageIcon style={TEAL} />,
  Atrium: () => <AccountBalanceIcon style={TEAL} />,
  Group: () => <GroupsIcon style={TEAL} />,
  Medical: () => <MedicalServicesIcon style={TEAL} />,
  Menu: () => <MenuBookIcon style={TEAL} />,
  Services: () => <MenuBookIcon style={TEAL} />,
  Police: () => <LocalPoliceIcon style={TEAL} />,
  House: () => <House style={TEAL} />,
  Stars: () => <Stars style={TEAL} />,
  GoldStars: () => <Stars style={TEAL} />,
  Heart: () => <Heart style={TEAL} />,
  Tips: () => <Tips style={TEAL} />,
  Rugby: () => <Rugby style={TEAL} />,
  Cloud: () => <Cloud style={TEAL} />,
  News: () => <News style={TEAL} />,
  BarMenu: () => <BarMenu style={TEAL} />,
  Computer: () => <Computer style={TEAL} />,
  Schedule: () => <Schedule style={TEAL} />,
  Query: () => <Query style={TEAL} />,
  Security: () => <Security style={TEAL} />,
  Files: () => <Files style={TEAL} />,
  Debug: () => <Debug style={TEAL} />,
  Bulletin: () => <Bulletin style={TEAL} />,
  Person: () => <Person style={TEAL} />,
  Lock: () => <Lock style={TEAL} />,
  Hours: () => <Hours style={TEAL} />,
  Deals: () => <Deals style={TEAL} />,
  Inventory: () => <Inventory style={TEAL} />,
  VideoGame: () => <VideoGame style={TEAL} />,
  Radio: () => <Radio style={TEAL} />,
  CoffeeMachine: () => <CoffeeMachine style={TEAL} />,
  Briefing: () => <Briefing style={TEAL} />,
  Bounty: () => <Bounty style={TEAL} />,
  Maintenance: () => <Maintenance style={TEAL} />,
  Vending: () => <Vending style={TEAL} />,
  Entertainment: () => <Entertainment style={TEAL} />,
  Time: () => <Time style={TEAL} />,
  Food: () => <Food style={TEAL} />,
  ATM: () => <ATM style={TEAL} />,
  LAN: () => <LAN style={TEAL} />,
  RipperDoc: () => <Vaccines style={TEAL} />,
  Trophy: () => <Trophy style={TEAL} />,
  Traffic: () => <Traffic style={TEAL} />,
  Taxi: () => <Taxi style={TEAL} />,
  Nightlife: () => <Nightlife style={TEAL} />,
  Alert: () => <WarningAmberIcon style={TEAL} />,
  Warning: () => <WarningAmberIcon style={TEAL} />,
  BurnchurchHex: () => <WhatshotIcon style={TEAL} />,
  Prison: () => <GavelIcon style={TEAL} />,
  Pin: () => <FmdGoodIcon style={TEAL} />,
  Ad: () => <CampaignIcon style={TEAL} />,
  Bodega: () => <StorefrontIcon style={TEAL} />,
  Camera: () => <VideocamIcon style={TEAL} />,
  LiveFeed: () => <VideocamIcon style={TEAL} />,
  Hospital: () => <LocalHospitalIcon style={TEAL} />,
  Garage: () => <BuildIcon style={TEAL} />,
  Bar: () => <SportsBarIcon style={TEAL} />,
  Pawn: () => <DiamondIcon style={TEAL} />,
  PawnGold: () => <DiamondIcon style={TEAL} />,
  Cipher: () => <LockIcon style={TEAL} />,
  Tech: () => <CodeIcon style={TEAL} />,
  Shipping: () => <LocalShippingIcon style={TEAL} />,
  Science: () => <ScienceIcon style={TEAL} />,
  Casino: () => <CasinoIcon style={TEAL} />,
  Music: () => <MusicNoteIcon style={TEAL} />,
  Apartment: () => <ApartmentIcon style={TEAL} />,
  Tower: () => <BusinessIcon style={TEAL} />,
  City: () => <LocationCityIcon style={TEAL} />,
  Map: () => <MapIcon style={TEAL} />,
  Games: () => <SportsEsportsIcon style={TEAL} />,
  Wallet: () => <AccountBalanceWalletIcon style={TEAL} />,
  Warehouse: () => <Warehouse style={TEAL} />,
  Hotel: () => <Hotel style={TEAL} />,
};

export default Icons;
